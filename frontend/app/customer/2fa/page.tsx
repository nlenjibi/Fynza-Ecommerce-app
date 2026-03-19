"use client";

import { useState } from "react";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Smartphone, 
  Mail, 
  Check,
  AlertCircle,
  QrCode,
  Key,
  Copy
} from "lucide-react";

export default function TwoFactorAuthPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes] = useState([
    "ABC123-XYZ789",
    "DEF456-UVW012",
    "GHI789-RST345",
    "JKL012-MNO678",
    "PQR345-STU901",
    "VWX901-YZA234",
  ]);

  const handleEnable2FA = () => {
    setSetupStep(2);
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true);
      setSetupStep(3);
    }
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setSetupStep(1);
    setVerificationCode("");
  };

  const copyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h1>
            <p className="text-gray-600">Add an extra layer of security to your account</p>
          </div>

          {/* Status Card */}
          <Card className={`border-0 shadow-sm mb-6 ${twoFactorEnabled ? 'border-green-200 bg-green-50' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${twoFactorEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Shield className={`h-6 w-6 ${twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {twoFactorEnabled ? "2FA is Enabled" : "2FA is Disabled"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {twoFactorEnabled 
                        ? "Your account is protected with two-factor authentication" 
                        : "Protect your account by enabling two-factor authentication"}
                    </p>
                  </div>
                </div>
                {!twoFactorEnabled && (
                  <Button 
                    onClick={handleEnable2FA}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Enable 2FA
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Setup Steps */}
          {setupStep === 2 && (
            <Card className="border-0 shadow-sm mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-orange-500" />
                  Set Up Authenticator App
                </CardTitle>
                <CardDescription>
                  Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code Placeholder */}
                <div className="flex justify-center">
                  <div className="bg-white p-4 border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Manual Entry Key */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Can't scan? Enter this key manually:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-4 py-2 rounded border font-mono text-sm">
                      JBSW-Y3DP-6TBH-9Z6X
                    </code>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigator.clipboard.writeText("JBSW-Y3DP-6TBH-9Z6X")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Verification Input */}
                <div>
                  <Label htmlFor="verificationCode">Enter Verification Code</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="verificationCode"
                      type="text"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-2xl tracking-widest font-mono"
                      maxLength={6}
                    />
                    <Button 
                      onClick={handleVerify}
                      disabled={verificationCode.length !== 6}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Verify
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => setSetupStep(1)}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Backup Codes */}
          {setupStep === 3 && twoFactorEnabled && (
            <Card className="border-0 shadow-sm mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Key className="h-5 w-5 text-orange-500" />
                  Backup Codes
                </CardTitle>
                <CardDescription>
                  Save these backup codes in a secure place. You can use them to access your account if you lose your phone.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {backupCodes.map((code, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border"
                    >
                      <code className="font-mono text-sm">{code}</code>
                      <button 
                        onClick={() => copyBackupCode(code)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold">Important:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Each code can only be used once</li>
                      <li>Store these codes in a secure location</li>
                      <li>You can generate new codes anytime</li>
                    </ul>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Download Backup Codes
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Methods */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Authentication Methods</CardTitle>
              <CardDescription>
                Choose how you want to receive verification codes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Authenticator App</p>
                    <p className="text-sm text-gray-500">Use an app like Google Authenticator</p>
                  </div>
                </div>
                <Switch defaultChecked disabled={!twoFactorEnabled} />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">Receive codes via email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              {twoFactorEnabled && (
                <Button 
                  variant="destructive" 
                  className="w-full mt-4"
                  onClick={handleDisable2FA}
                >
                  Disable Two-Factor Authentication
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
