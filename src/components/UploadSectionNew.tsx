import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, RefreshCcw, Languages, Sparkles, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { translationAPI, JobStatus, type JobResponse } from "@/services/api";
import { LanguageSelector } from "@/components/LanguageSelector";
import { FileUpload } from "@/components/FileUpload";
import { JobProgress } from "@/components/JobProgress";

const UploadSection = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  
  // Job management state
  const [currentJob, setCurrentJob] = useState<JobResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [stopPolling, setStopPolling] = useState<(() => void) | null>(null);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setError(null);
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    setError(null);
  };

  const handleStartTranslation = async () => {
    if (!uploadedFile || !targetLang) return;
    
    setIsProcessing(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      // Step 1: Upload file
      setUploadProgress(20);
      const uploadResult = await translationAPI.uploadFile(uploadedFile);
      
      // Step 2: Create job
      setUploadProgress(40);
      const job = await translationAPI.createJob({
        filename: uploadedFile.name,
        file_size: uploadedFile.size,
        source_language: sourceLang || undefined,
        target_language: targetLang,
        options: {
          file_key: uploadResult.file_key
        }
      });
      
      setCurrentJob(job);
      setUploadProgress(60);
      
      // Step 3: Start processing
      await translationAPI.startJob(job.id);
      setUploadProgress(80);
      
      // Step 4: Start polling for updates
      const cleanup = await translationAPI.pollJobStatus(job.id, (updatedJob) => {
        setCurrentJob(updatedJob);
        if (updatedJob.status === JobStatus.COMPLETED) {
          setIsProcessing(false);
          setUploadProgress(100);
        } else if (updatedJob.status === JobStatus.FAILED) {
          setIsProcessing(false);
          setError(updatedJob.error_message || "Translation failed");
        }
      });
      
      setStopPolling(() => cleanup);
      setUploadProgress(100);
      
    } catch (err) {
      setIsProcessing(false);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleReset = () => {
    if (stopPolling) {
      stopPolling();
      setStopPolling(null);
    }
    setCurrentJob(null);
    setIsProcessing(false);
    setUploadProgress(0);
    setError(null);
    setUploadedFile(null);
    setSourceLang("");
    setTargetLang("");
  };

  const handleDownload = async () => {
    if (currentJob?.download_url) {
      window.open(currentJob.download_url, '_blank');
    }
  };

  const isReadyToTranslate = uploadedFile && targetLang && !isProcessing;
  const showJobProgress = currentJob && (isProcessing || currentJob.status !== JobStatus.PENDING);

  return (
    <section id="upload" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              AI-Powered Translation
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Transform Your <span className="text-primary">Documents</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Upload your PDF and watch as we preserve every detail while translating to your target language.
            </p>
          </div>

          <Card className="p-8 shadow-lg border-0 bg-card/50 backdrop-blur">
            {!showJobProgress ? (
              <div className="space-y-8">
                {/* File Upload */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <h3 className="text-lg font-semibold">Upload your PDF document</h3>
                  </div>
                  
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    selectedFile={uploadedFile}
                    disabled={isProcessing}
                  />
                </div>

                {/* Language Selection */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Source Language */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-lg font-semibold">Source Language</h3>
                      <Badge variant="secondary" className="text-xs">Optional</Badge>
                    </div>
                    
                    <LanguageSelector
                      value={sourceLang}
                      onValueChange={setSourceLang}
                      placeholder="Auto-detect language"
                      disabled={isProcessing}
                      excludeLanguages={targetLang ? [targetLang] : []}
                    />
                  </div>

                  {/* Target Language */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <h3 className="text-lg font-semibold">Target Language</h3>
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    </div>
                    
                    <LanguageSelector
                      value={targetLang}
                      onValueChange={setTargetLang}
                      placeholder="Choose target language"
                      disabled={isProcessing}
                      excludeLanguages={sourceLang ? [sourceLang] : []}
                    />
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Start Translation Button */}
                <div className="flex items-center justify-center pt-4">
                  <Button 
                    onClick={handleStartTranslation}
                    disabled={!isReadyToTranslate}
                    size="lg"
                    className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                  >
                    <Languages className="w-5 h-5 mr-2" />
                    Start Translation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-4 pt-8 border-t">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold">Layout Preserved</h4>
                    <p className="text-sm text-muted-foreground">Original formatting maintained</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto">
                      <Languages className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold">100+ Languages</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive language support</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold">AI-Powered</h4>
                    <p className="text-sm text-muted-foreground">Advanced translation quality</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Job Progress */}
                <JobProgress
                  status={currentJob.status}
                  progress={currentJob.progress_percent}
                  currentStage={currentJob.current_stage}
                  currentPage={currentJob.current_page}
                  totalPages={currentJob.total_pages}
                  errorMessage={currentJob.error_message}
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4">
                  {currentJob.status === JobStatus.COMPLETED && (
                    <Button 
                      onClick={handleDownload}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Translated PDF
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                  >
                    <RefreshCcw className="w-5 h-5 mr-2" />
                    Translate Another Document
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
