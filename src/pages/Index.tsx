import { FileSignature } from "lucide-react";
import { UploadSection } from "@/components/UploadSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-8 space-y-4">
          <div className="flex justify-center items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative bg-gradient-to-br from-primary to-primary-glow p-6 rounded-3xl shadow-2xl">
                <FileSignature className="w-16 h-16 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight pb-2">
              Sign PDF Easily
            </h1>
          </div>

          <div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Secure, Simple, and Fast Online PDF Signing Platform
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
              <h3 className="text-lg font-semibold mb-2 text-foreground">Upload PDF</h3>
              <p className="text-sm text-muted-foreground">
                Select or drag and drop your PDF file for quick and secure upload to the cloud
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-lg border-2 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-primary-foreground font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Share Link</h3>
              <p className="text-sm text-muted-foreground">
                Copy the secure sharing link and send it to those who need to sign
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-lg border-2 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-accent-foreground font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Sign & Download</h3>
              <p className="text-sm text-muted-foreground">
                Draw your signature, adjust position, and download instantly
              </p>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border-2 border-primary/20">
            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <h2 className="text-2xl font-bold text-foreground">🔒 Security Guarantee</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ All files are encrypted during transmission and storage</li>
                <li>✓ Share links are randomly generated and unpredictable</li>
                <li>✓ Files are automatically deleted after 7 days to protect privacy</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
