import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Globe, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

const UploadSection = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
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
                  disabled={!uploadedFile || !targetLang}
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Start Translation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  By uploading, you agree to our Terms of Service and Privacy Policy
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;