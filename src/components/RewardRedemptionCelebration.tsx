import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gift, Mail, CheckCircle2 } from 'lucide-react';

interface RewardCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  rewardTitle: string;
  pointsSpent: number;
}

export const RewardRedemptionCelebration: React.FC<RewardCelebrationProps> = ({
  isOpen,
  onClose,
  rewardTitle,
  pointsSpent
}) => {
  const { width, height } = useWindowSize();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {isOpen && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.15}
          />
        )}

        <DialogHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600">
            <Gift className="h-10 w-10 text-white animate-bounce" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-leafy-800">
            Reward Redeemed! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-leafy-800 mb-2">
              {rewardTitle}
            </h3>
            <p className="text-leafy-600 text-sm mb-4">
              You've successfully redeemed this reward for {pointsSpent} points!
            </p>
          </div>

          <div className="bg-leafy-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-leafy-800 text-sm">Points Deducted</p>
                <p className="text-leafy-600 text-xs">Your new balance has been updated</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-leafy-800 text-sm">Gift on the Way!</p>
                <p className="text-leafy-600 text-xs">
                  Check your email for redemption details and next steps
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-leafy-500 pt-2">
            You'll receive an email within 24 hours with instructions
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
