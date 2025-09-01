/**
 * API service for communicating with the backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface JobCreate {
  filename: string;
  file_size: number;
  source_language?: string;
  target_language: string;
  options?: Record<string, any>;
}

export interface JobResponse {
  id: string;
  filename: string;
  file_size?: number;
  source_language?: string;
  target_language: string;
  status: JobStatus;
  progress_percent: number;
  current_stage?: string;
  current_page: number;
  total_pages: number;
  download_url?: string;
  error_message?: string;
  processing_time?: number;
  created_at: string;
  completed_at?: string;
}

export enum JobStatus {
  PENDING = "pending",
  UPLOADING = "uploading",
  UPLOADED = "uploaded", 
  EXTRACTING = "extracting",
  TRANSLATING = "translating",
  SHAPING = "shaping",
  BUILDING = "building",
  QA_CHECK = "qa_check",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled"
}

export interface UploadResponse {
  job_id: string;
  upload_url: string;
  upload_fields: Record<string, any>;
  expires_in: number;
}

class TranslationAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async createJob(jobData: JobCreate): Promise<JobResponse> {
    return this.request<JobResponse>('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async uploadFile(file: File): Promise<{ file_key: string; file_size: number }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/upload/direct`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
      throw new Error(error.detail || `Upload failed: HTTP ${response.status}`);
    }

    return response.json();
  }

  async getJob(jobId: string): Promise<JobResponse> {
    return this.request<JobResponse>(`/jobs/${jobId}`);
  }

  async startJob(jobId: string): Promise<{ message: string; job_id: string }> {
    return this.request(`/jobs/${jobId}/start`, {
      method: 'POST',
    });
  }

  async cancelJob(jobId: string): Promise<{ message: string; job_id: string }> {
    return this.request(`/jobs/${jobId}/cancel`, {
      method: 'POST',
    });
  }

  // Polling-based status updates (WebSocket alternative for now)
  async pollJobStatus(
    jobId: string,
    onUpdate: (job: JobResponse) => void,
    intervalMs: number = 2000
  ): Promise<() => void> {
    let isPolling = true;

    const poll = async () => {
      if (!isPolling) return;

      try {
        const job = await this.getJob(jobId);
        onUpdate(job);

        // Stop polling if job is in final state
        if ([JobStatus.COMPLETED, JobStatus.FAILED, JobStatus.CANCELLED].includes(job.status)) {
          isPolling = false;
          return;
        }

        // Schedule next poll
        setTimeout(poll, intervalMs);
      } catch (error) {
        console.error('Failed to poll job status:', error);
        // Continue polling despite errors
        setTimeout(poll, intervalMs);
      }
    };

    // Start polling
    poll();

    // Return cleanup function
    return () => {
      isPolling = false;
    };
  }
}

export const translationAPI = new TranslationAPI();
