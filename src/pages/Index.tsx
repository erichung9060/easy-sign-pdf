import { FileSignature } from "lucide-react";
import { UploadSection } from "@/components/UploadSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-12 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative bg-gradient-to-br from-primary to-primary-glow p-6 rounded-3xl shadow-2xl">
                <FileSignature className="w-16 h-16 text-primary-foreground" />
              </div>
            </div>
          </div>
          
          <div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight pb-2">
              Sign PDF Easily
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              安全、簡單、快速的線上 PDF 簽名平台
            </p>
          </div>
        </header>

        <main className="space-y-8">
          <UploadSection />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card p-6 rounded-xl shadow-lg border-2 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-primary-foreground font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">上傳 PDF</h3>
              <p className="text-sm text-muted-foreground">
                選擇或拖放您的 PDF 檔案，快速上傳到安全雲端
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-lg border-2 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-primary-foreground font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">分享連結</h3>
              <p className="text-sm text-muted-foreground">
                複製安全分享連結，傳送給需要簽署的人員
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-lg border-2 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-accent-foreground font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">簽名下載</h3>
              <p className="text-sm text-muted-foreground">
                手繪簽名、調整位置，完成後立即下載
              </p>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border-2 border-primary/20">
            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <h2 className="text-2xl font-bold text-foreground">🔒 安全保障</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ 所有檔案加密傳輸與儲存</li>
                <li>✓ 分享連結採用隨機生成，無法被猜測</li>
                <li>✓ 檔案自動於 7 天後刪除，保護隱私</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
