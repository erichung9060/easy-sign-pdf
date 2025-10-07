import { useRef, useState, useEffect } from "react";
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

  useEffect(() => {
    const handleResize = () => {
      if (sigCanvas.current) {
        const canvas = sigCanvas.current.getCanvas();
        const signaturePad = sigCanvas.current;

        const data = signaturePad.toData();

        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d")?.scale(ratio, ratio);

        signaturePad.fromData(data);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
  };

  const handleSave = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL("image/png");
      onSave(dataUrl);
    }
  };

  return (
    <Card className="p-4 sm:p-6 space-y-4 max-w-2xl w-full mx-auto border-2 shadow-xl">
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">Draw Your Signature</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Draw your signature in the white area below
        </p>
      </div>

      <div className="border-2 border-border rounded-lg overflow-hidden bg-white shadow-inner">
        <SignatureCanvasPad
          ref={sigCanvas}
          canvasProps={{
            className: "w-full h-48 sm:h-64 cursor-crosshair",
          }}
          onEnd={() => setIsEmpty(false)}
          clearOnResize={false}
          penColor="rgb(0, 0, 0)"
          minWidth={1.5}
          maxWidth={3}
          velocityFilterWeight={0.7}
          throttle={16}
        />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          className="gap-2 flex-1 sm:flex-none min-w-0"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Cancel</span>
        </Button>
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isEmpty}
          className="gap-2 flex-1 sm:flex-none min-w-0"
        >
          <Eraser className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
        <Button
          onClick={handleSave}
          disabled={isEmpty}
          className="gap-2 bg-gradient-to-r from-accent to-accent/80 hover:opacity-90 flex-1 sm:flex-none min-w-0"
        >
          <Check className="w-4 h-4" />
          <span className="hidden sm:inline">Confirm</span>
        </Button>
      </div>
    </Card>
  );
};
