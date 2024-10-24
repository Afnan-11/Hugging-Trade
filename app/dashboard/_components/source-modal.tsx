"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {X, Video, Instagram, Twitter, Search, Users, HelpCircle} from "lucide-react";
import {Input} from "@/components/ui/input";
import {userUpdateFields} from "@/app/actions/userUpdateFields";
import {toast} from "sonner";

type SourceOption = "TikTok" | "Instagram" | "Twitter" | "Google" | "Referral" | "Other";

const sourceOptions: Array<{value: SourceOption; icon: React.ElementType}> = [
  {value: "TikTok", icon: Video},
  {value: "Instagram", icon: Instagram},
  {value: "Twitter", icon: Twitter},
  {value: "Google", icon: Search},
  {value: "Referral", icon: Users},
  {value: "Other", icon: HelpCircle},
];

type SourceModalProps = {
  setShowSourceModal: (show: boolean) => void;
  showSourceModal: boolean;
};

export function SourceModal({setShowSourceModal, showSourceModal}: SourceModalProps) {
  const [selectedSource, setSelectedSource] = useState<SourceOption | null>(null);
  const [otherSource, setOtherSource] = useState("");

  const handleSubmit = async () => {
    if (selectedSource) {
      const source = selectedSource === "Other" ? otherSource : selectedSource;
      try {
        await userUpdateFields([{key: "source", value: source}]);
      } catch (error) {
        console.error("Error updating user fields:", error);
        toast.error("Error updating user fields");
      } finally {
        setShowSourceModal(false);
      }
    }
  };

  const handleClose = async () => {
    if (!selectedSource) {
      try {
        await userUpdateFields([{key: "source", value: "not-selected"}]);
      } catch (error) {
        console.error("Error updating user fields:", error);
        toast.error("Error updating user fields");
      }
    }
    setShowSourceModal(false);
  };

  return (
    <Dialog
      open={showSourceModal}
      onOpenChange={handleClose}
    >
      <DialogContent className="overflow-hidden sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-2xl font-bold text-transparent">
            Discover Your Path to Us
          </DialogTitle>
          <DialogDescription className="text-lg">
            {`We're curious! Help us understand how you found your way to our digital doorstep.`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {sourceOptions.map((option) => (
            <motion.div
              key={option.value}
              whileHover={{scale: 1.025}}
            >
              <Button
                variant="outline"
                className={`flex h-24 w-full flex-col items-center justify-center space-y-2 ${
                  selectedSource === option.value ? "border border-input bg-accent text-accent-foreground" : ""
                }`}
                onClick={() => setSelectedSource(option.value)}
              >
                <option.icon className="h-8 w-8" />
                <Label>{option.value}</Label>
              </Button>
              {selectedSource === "Other" && option.value === "Other" && (
                <Input
                  className="mt-2"
                  placeholder="Please specify"
                  value={otherSource}
                  onChange={(e) => setOtherSource(e.target.value)}
                />
              )}
            </motion.div>
          ))}
        </div>
        <DialogFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={!selectedSource}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/80"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
