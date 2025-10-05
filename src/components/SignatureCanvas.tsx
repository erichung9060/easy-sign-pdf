import { useRef, useState } from "react";
import SignatureCanvasPad from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eraser, Check, X } from "lucide-react";

interface SignatureCanvasProps {
  onSave: (signatureDataUrl: string) => void;
  onCancel: () => void;
}

export const SignatureCanvas = ({ onSave, onCancel }: SignatureCanvasProps) => {
  const sigCanvas = useRef<SignatureCanvasPad>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
  };

  const handleSave = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      try {
        // 獲取實際繪製內容（去除空白區域）
        const trimmedCanvas = sigCanvas.current.getTrimmedCanvas();

        // 使用裁剪後的畫布，確保只包含簽名內容
        const dataUrl = trimmedCanvas.toDataURL("image/png");
        onSave(dataUrl);
      } catch (error) {
        console.error("裁剪簽名失敗，使用原始畫布:", error);
        // 如果裁剪失敗，使用原始畫布
        const dataUrl = sigCanvas.current.toDataURL("image/png");
        onSave(dataUrl);
      }
    }
  };

  return (
    <Card className="p-6 space-y-4 max-w-2xl mx-auto border-2 shadow-xl">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">繪製您的簽名</h3>
        <p className="text-sm text-muted-foreground">
          在下方白色區域繪製您的簽名
        </p>
      </div>

      <div className="border-2 border-border rounded-lg overflow-hidden bg-white shadow-inner">
        <SignatureCanvasPad
          ref={sigCanvas}
          canvasProps={{
            className: "w-full h-64 cursor-crosshair",
          }}
          onEnd={() => setIsEmpty(false)}
          clearOnResize={false}
          penColor="rgb(0, 0, 0)"
        />
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          className="gap-2"
        >
          <X className="w-4 h-4" />
          取消
        </Button>
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isEmpty}
          className="gap-2"
        >
          <Eraser className="w-4 h-4" />
          清除
        </Button>
        <Button
          onClick={handleSave}
          disabled={isEmpty}
          className="gap-2 bg-gradient-to-r from-accent to-accent/80 hover:opacity-90"
        >
          <Check className="w-4 h-4" />
          確認簽名
        </Button>
      </div>
    </Card>
  );
};
