import { useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Smartphone,
  Clock,
  Building2,
  Save,
  RotateCcw,
  Check,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { useTheme, AccentColor } from "@/contexts/ThemeContext";

const accentColors: { id: AccentColor; label: string; bgClass: string }[] = [
  { id: "teal", label: "Teal", bgClass: "bg-[hsl(182,86%,14%)]" },
  { id: "blue", label: "Blue", bgClass: "bg-[hsl(217,91%,50%)]" },
  { id: "green", label: "Green", bgClass: "bg-[hsl(142,71%,35%)]" },
  { id: "purple", label: "Purple", bgClass: "bg-[hsl(271,81%,50%)]" },
  { id: "orange", label: "Orange", bgClass: "bg-[hsl(25,95%,53%)]" },
];

function SettingsContent() {
  const [hasChanges, setHasChanges] = useState(false);
  const { accentColor, setAccentColor } = useTheme();
  const [selectedColor, setSelectedColor] = useState<AccentColor>(accentColor);

  const handleSave = () => {
    setAccentColor(selectedColor);
    toast.success("Settings saved successfully");
    setHasChanges(false);
  };

  const handleReset = () => {
    setSelectedColor("teal");
    setAccentColor("teal");
    toast.info("Settings reset to defaults");
    setHasChanges(false);
  };

  const markAsChanged = () => {
    if (!hasChanges) setHasChanges(true);
  };

  const handleColorSelect = (color: AccentColor) => {
    setSelectedColor(color);
    markAsChanged();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground text-lg">Manage your system preferences and configurations</p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <Badge variant="outline" className="gap-1.5 text-warning border-warning/30 bg-warning/10">
              <AlertCircle className="h-3 w-3" />
              Unsaved changes
            </Badge>
          )}
          <Button variant="outline" size="sm" className="gap-2" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button size="sm" className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Business Information</CardTitle>
                    <CardDescription>Your organization details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input 
                    id="business-name" 
                    defaultValue="Toorrii" 
                    onChange={markAsChanged}
                    className="bg-muted/30 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="admin@toorrii.com"
                    onChange={markAsChanged}
                    className="bg-muted/30 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    defaultValue="+213 XX XXX XXXX"
                    onChange={markAsChanged}
                    className="bg-muted/30 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input 
                    id="address" 
                    defaultValue="Algiers, Algeria"
                    onChange={markAsChanged}
                    className="bg-muted/30 border-border/50 focus:border-primary/50"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Regional Settings</CardTitle>
                    <CardDescription>Timezone and language preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc+1" onValueChange={markAsChanged}>
                    <SelectTrigger className="bg-muted/30 border-border/50">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                      <SelectItem value="utc+1">UTC+1 (CET - Algeria)</SelectItem>
                      <SelectItem value="utc+2">UTC+2 (EET)</SelectItem>
                      <SelectItem value="utc+3">UTC+3 (MSK)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en" onValueChange={markAsChanged}>
                    <SelectTrigger className="bg-muted/30 border-border/50">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="dmy" onValueChange={markAsChanged}>
                    <SelectTrigger className="bg-muted/30 border-border/50">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select defaultValue="24h" onValueChange={markAsChanged}>
                    <SelectTrigger className="bg-muted/30 border-border/50">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Clock className="h-5 w-5 text-success" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Queue Configuration</CardTitle>
                  <CardDescription>Customize queue behavior and defaults</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-capacity">Default Queue Capacity</Label>
                  <Input 
                    id="default-capacity" 
                    type="number" 
                    defaultValue="50"
                    onChange={markAsChanged}
                    className="bg-muted/30 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avg-service-time">Avg. Service Time (minutes)</Label>
                  <Input 
                    id="avg-service-time" 
                    type="number" 
                    defaultValue="15"
                    onChange={markAsChanged}
                    className="bg-muted/30 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">Auto-refresh Interval (seconds)</Label>
                  <Input 
                    id="refresh-interval" 
                    type="number" 
                    defaultValue="30"
                    onChange={markAsChanged}
                    className="bg-muted/30 border-border/50 focus:border-primary/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Email Notifications</CardTitle>
                    <CardDescription>Configure email alert preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Customer Queue Updates</Label>
                    <p className="text-sm text-muted-foreground">Send email when customer is next</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Daily Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive daily queue summary</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical system notifications</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Marketing Updates</Label>
                    <p className="text-sm text-muted-foreground">News and feature updates</p>
                  </div>
                  <Switch onCheckedChange={markAsChanged} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Smartphone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">SMS Notifications</CardTitle>
                    <CardDescription>Configure SMS alert preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Queue Position Updates</Label>
                    <p className="text-sm text-muted-foreground">Notify when position changes</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Turn Approaching</Label>
                    <p className="text-sm text-muted-foreground">Alert when turn is coming up</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Service Complete</Label>
                    <p className="text-sm text-muted-foreground">Confirmation after service</p>
                  </div>
                  <Switch onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Feedback Requests</Label>
                    <p className="text-sm text-muted-foreground">Ask for rating after service</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Bell className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">In-App Notifications</CardTitle>
                  <CardDescription>Dashboard notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Real-time Updates</Label>
                    <p className="text-xs text-muted-foreground">Live queue changes</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Sound Alerts</Label>
                    <p className="text-xs text-muted-foreground">Audio notifications</p>
                  </div>
                  <Switch onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Desktop Alerts</Label>
                    <p className="text-xs text-muted-foreground">Browser notifications</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Theme</CardTitle>
                    <CardDescription>Customize the look and feel</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark theme</p>
                  </div>
                  <Switch onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">System Theme</Label>
                    <p className="text-sm text-muted-foreground">Follow system preferences</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="space-y-3">
                  <Label>Accent Color</Label>
                  <div className="flex gap-3">
                    {accentColors.map((color) => (
                      <button
                        key={color.id}
                        title={color.label}
                        className={`w-8 h-8 rounded-full ${color.bgClass} ring-2 ring-offset-2 ring-offset-background ${
                          selectedColor === color.id 
                            ? "ring-foreground scale-110" 
                            : "ring-transparent hover:ring-muted-foreground/50"
                        } transition-all duration-200`}
                        onClick={() => handleColorSelect(color.id)}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Selected: <span className="font-medium capitalize">{selectedColor}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <SettingsIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Display</CardTitle>
                    <CardDescription>Layout and density settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Compact View</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing</p>
                  </div>
                  <Switch onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Show Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable UI animations</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Sidebar Collapsed</Label>
                    <p className="text-sm text-muted-foreground">Start with sidebar closed</p>
                  </div>
                  <Switch onCheckedChange={markAsChanged} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Shield className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Authentication</CardTitle>
                    <CardDescription>Security and login settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add extra security layer</p>
                  </div>
                  <Switch onCheckedChange={markAsChanged} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
                <div className="space-y-2">
                  <Label>Session Duration</Label>
                  <Select defaultValue="8h" onValueChange={markAsChanged}>
                    <SelectTrigger className="bg-muted/30 border-border/50">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 Hour</SelectItem>
                      <SelectItem value="4h">4 Hours</SelectItem>
                      <SelectItem value="8h">8 Hours</SelectItem>
                      <SelectItem value="24h">24 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Database className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Data & Privacy</CardTitle>
                    <CardDescription>Data retention and privacy</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt sensitive data</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-success hover:bg-success gap-1">
                      <Check className="h-3 w-3" />
                      Enabled
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Data Retention Period</Label>
                  <Select defaultValue="1y" onValueChange={markAsChanged}>
                    <SelectTrigger className="bg-muted/30 border-border/50">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30d">30 Days</SelectItem>
                      <SelectItem value="90d">90 Days</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Analytics Collection</Label>
                    <p className="text-sm text-muted-foreground">Collect usage analytics</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={markAsChanged} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Settings() {
  return (
    <DashboardLayout>
      <SettingsContent />
    </DashboardLayout>
  );
}
