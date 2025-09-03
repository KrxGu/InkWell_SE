import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, RefreshCcw, Languages, Sparkles, Zap } from "lucide-react";
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

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese (Simplified)" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
  ];

  return (
    <section id="upload" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Upload & Translate in Seconds
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple drag-and-drop interface with intelligent language detection
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-document">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Area */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  Upload Your PDF
                </div>
                
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    isDragOver
                      ? 'border-primary bg-primary/5'
                      : uploadedFile
                      ? 'border-success bg-success/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  
                  {uploadedFile ? (
                    <div className="space-y-3">
                      <CheckCircle className="w-12 h-12 text-success mx-auto" />
                      <div>
                        <div className="font-semibold text-foreground">{uploadedFile.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <div className="font-semibold text-foreground">Drop your PDF here</div>
                        <div className="text-sm text-muted-foreground">
                          or click to browse • Max 100MB
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Language Selection */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  Select Languages
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Source Language
                    </label>
                    <Select value={sourceLang} onValueChange={setSourceLang}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Auto-detect language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Target Language
                    </label>
                    <Select value={targetLang} onValueChange={setTargetLang}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose target language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={!uploadedFile || !targetLang || isProcessing}
                  onClick={handleStartTranslation}
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Globe className="w-5 h-5 mr-2" />
                      Start Translation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  By uploading, you agree to our Terms of Service and Privacy Policy
                </div>
              </div>
            </div>
          </Card>

          {/* Progress Tracking */}
          {isProcessing && currentJob && (
            <Card className="p-6 mt-8 shadow-document">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Translation Progress</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleReset}
                    disabled={currentJob.status === JobStatus.COMPLETED}
                  >
                    Cancel
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium capitalize">{currentJob.current_stage || currentJob.status}</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${currentJob.progress_percent}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{currentJob.progress_percent.toFixed(0)}% complete</span>
                    {currentJob.total_pages > 0 && (
                      <span>Page {currentJob.current_page} of {currentJob.total_pages}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Card className="p-6 mt-8 border-destructive bg-destructive/5">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-destructive">Translation Failed</h3>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Try Again
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Completion */}
          {currentJob && currentJob.status === JobStatus.COMPLETED && (
            <Card className="p-6 mt-8 border-success bg-success/5">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <div>
                    <h3 className="text-lg font-semibold text-success">Translation Complete!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your PDF has been translated while preserving the original layout.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {currentJob.download_url && (
                    <Button 
                      variant="success" 
                      size="lg"
                      onClick={() => window.open(currentJob.download_url, '_blank')}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Translated PDF
                    </Button>
                  )}
                  
                  <Button variant="outline" size="lg" onClick={handleReset}>
                    Translate Another File
                  </Button>
                </div>
                
                {currentJob.processing_time && (
                  <div className="text-xs text-muted-foreground">
                    Completed in {(currentJob.processing_time / 60).toFixed(1)} minutes
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;