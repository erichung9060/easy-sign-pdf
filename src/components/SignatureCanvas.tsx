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
        const trimmedCanvas = sigCanvas.current.getTrimmedCanvas();
        const dataUrl = trimmedCanvas.toDataURL("image/png");
        onSave(dataUrl);
      } catch (error) {
        const dataUrl = sigCanvas.current.toDataURL("image/png");
        onSave(dataUrl);
      }
    }
  };

  return (
    <Card className="p-6 space-y-4 max-w-2xl mx-auto border-2 shadow-xl">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Draw Your Signature</h3>
        <p className="text-sm text-muted-foreground">
          Draw your signature in the white area below
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
          minWidth={1.5}
          maxWidth={3.5}
          velocityFilterWeight={0.7}
          throttle={16}
        />
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          className="gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isEmpty}
          className="gap-2"
        >
          <Eraser className="w-4 h-4" />
          Clear
        </Button>
        <Button
          onClick={handleSave}
          disabled={isEmpty}
          className="gap-2 bg-gradient-to-r from-accent to-accent/80 hover:opacity-90"
        >
          <Check className="w-4 h-4" />
          Confirm Signature
        </Button>
      </div>
    </Card>
  );
};
