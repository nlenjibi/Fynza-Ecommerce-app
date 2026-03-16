import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, LogIn, Lock, ArrowLeft } from "lucide-react"

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-lg w-full text-center">
        {/* Lock Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <Lock className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          You don't have permission to access this page. Please log in with an authorized account or return to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#FF6900] hover:bg-[#FF6700] text-white px-8 py-6 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-2 border-[#FF6900] text-[#FF6900] hover:bg-[#FF6900] hover:text-white px-8 py-6 text-lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Button>
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/" className="text-gray-500 hover:text-[#FF6900] inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to previous page
          </Link>
        </div>
      </div>
    </div>
  )
}