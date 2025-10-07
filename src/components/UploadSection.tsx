import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { nanoid } from "nanoid";

export const UploadSection = () => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("請上傳 PDF 檔案");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("檔案大小不能超過 10MB");
      return;
    }

    setUploading(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        const { error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
      }

      const shareId = nanoid(16);
      const sharedFileName = `d${shareId}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(sharedFileName, file);

      if (uploadError) {
        if (uploadError.message.includes('policy')) {
          toast.error("您今日已達上傳限制（10次），請明天再試");
          return;
        }
        throw uploadError;
      }

      const { error: dbError } = await supabase
        .from("documents")
        .insert({
          share_id: shareId,
          file_name: file.name,
          file_path: sharedFileName,
        });

      if (dbError) throw dbError;

      toast.success("檔案上傳成功！");
      navigate(`/share/${shareId}`);
    } catch (error) {
      toast.error("上傳失敗，請重試");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <Card
      className={`relative overflow-hidden border-2 border-dashed transition-all duration-300 ${
        dragActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="p-12 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div
            className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div className="relative bg-gradient-to-br from-primary to-primary-glow p-6 rounded-2xl">
            {uploading ? (
              <Loader2 className="w-12 h-12 text-primary-foreground animate-spin" />
            ) : (
              <Upload className="w-12 h-12 text-primary-foreground" />
            )}
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            上傳 PDF 檔案
          </h3>
          <p className="text-muted-foreground max-w-md">
            拖放檔案到這裡，或點擊下方按鈕選擇檔案。檔案會安全保存 7 天。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            variant="default"
            size="lg"
            disabled={uploading}
            onClick={() => document.getElementById("file-upload")?.click()}
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          >
            <FileText className="w-5 h-5 mr-2" />
            選擇檔案
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            className="hidden"
          />
          <span className="text-sm text-muted-foreground">
            最大檔案大小：10MB
          </span>
        </div>
      </div>
    </Card>
  );
};
