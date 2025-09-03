import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, FileText, Languages, Wrench, Download, Eye } from "lucide-react";
import { JobStatus } from "@/services/api";

interface JobProgressProps {
  status: JobStatus;
  progress: number;
  currentStage?: string;
  currentPage?: number;
  totalPages?: number;
  errorMessage?: string;
  className?: string;
}

const STAGE_ICONS = {
  [JobStatus.PENDING]: Clock,
  [JobStatus.UPLOADING]: FileText,
  [JobStatus.UPLOADED]: FileText,
  [JobStatus.EXTRACTING]: FileText,
  [JobStatus.TRANSLATING]: Languages,
  [JobStatus.SHAPING]: Wrench,
  [JobStatus.BUILDING]: Wrench,
  [JobStatus.QA_CHECK]: Eye,
  [JobStatus.COMPLETED]: CheckCircle,
  [JobStatus.FAILED]: AlertCircle,
  [JobStatus.CANCELLED]: AlertCircle,
};

const STAGE_LABELS = {
  [JobStatus.PENDING]: "Pending",
  [JobStatus.UPLOADING]: "Uploading file",
  [JobStatus.UPLOADED]: "File uploaded",
  [JobStatus.EXTRACTING]: "Extracting text",
  [JobStatus.TRANSLATING]: "Translating content",
  [JobStatus.SHAPING]: "Preserving layout", 
  [JobStatus.BUILDING]: "Building document",
  [JobStatus.QA_CHECK]: "Quality check",
  [JobStatus.COMPLETED]: "Translation complete",
  [JobStatus.FAILED]: "Translation failed",
  [JobStatus.CANCELLED]: "Translation cancelled",
};

const STAGE_DESCRIPTIONS = {
  [JobStatus.PENDING]: "Your translation job is queued and will start soon",
  [JobStatus.UPLOADING]: "Uploading your PDF file to our secure servers",
  [JobStatus.UPLOADED]: "File successfully uploaded and ready for processing",
  [JobStatus.EXTRACTING]: "Analyzing document structure and extracting text content",
  [JobStatus.TRANSLATING]: "Translating text content while preserving context",
  [JobStatus.SHAPING]: "Maintaining original formatting and layout structure",
  [JobStatus.BUILDING]: "Reconstructing the translated document",
  [JobStatus.QA_CHECK]: "Performing final quality assurance checks",
  [JobStatus.COMPLETED]: "Your translated document is ready for download",
  [JobStatus.FAILED]: "An error occurred during translation",
  [JobStatus.CANCELLED]: "The translation job was cancelled",
};

export function JobProgress({ 
  status, 
  progress, 
  currentStage, 
  currentPage = 0, 
  totalPages = 0,
  errorMessage,
  className 
}: JobProgressProps) {
  const Icon = STAGE_ICONS[status];
  const isCompleted = status === JobStatus.COMPLETED;
  const isFailed = status === JobStatus.FAILED || status === JobStatus.CANCELLED;
  const isProcessing = !isCompleted && !isFailed;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Status Header */}
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full",
          isCompleted && "bg-green-100 text-green-600",
          isFailed && "bg-red-100 text-red-600", 
          isProcessing && "bg-blue-100 text-blue-600"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className={cn(
            "font-semibold",
            isCompleted && "text-green-600",
            isFailed && "text-red-600",
            isProcessing && "text-blue-600"
          )}>
            {STAGE_LABELS[status]}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isFailed && errorMessage ? errorMessage : STAGE_DESCRIPTIONS[status]}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {isProcessing && (
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-2"
            indicatorClassName={cn(
              "transition-all duration-500 ease-out",
              "bg-gradient-to-r from-blue-500 to-blue-600"
            )}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}% complete</span>
            {totalPages > 0 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stage Details */}
      {currentStage && isProcessing && (
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm font-medium">{currentStage}</p>
        </div>
      )}

      {/* Success State */}
      {isCompleted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Translation Complete!</p>
            <p className="text-sm text-green-600">Your document is ready for download</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isFailed && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-800">Translation Failed</p>
            <p className="text-sm text-red-600">
              {errorMessage || "An unexpected error occurred. Please try again."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
