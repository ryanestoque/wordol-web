import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";


export default function GameSettings() {
  return(
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="cursor-pointer">
          <Settings className="scale-150 md:scale-180"/>
        </Button>
      </DialogTrigger> 
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-martires-black mb-6">SETTINGS</DialogTitle>
          <div className="flex flex-col gap-6">
            <div className="p-0 flex flex-row items-center justify-between space-x-2">
              <Label htmlFor="airplane-mode" className="font-inter-medium text-base">Lagom Mode</Label>
              <Switch id="airplane-mode"/>
            </div>
            <Button variant="ghost" className="p-0 flex flex-row items-center justify-between space-x-2">
              <Label htmlFor="airplane-mode" className="font-inter-medium text-base">Akawnt</Label>
            </Button>
            <div className="flex flex-row items-center justify-between space-x-2">
              <Label htmlFor="airplane-mode" className="font-inter-medium text-base">Clear Statistics</Label>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}