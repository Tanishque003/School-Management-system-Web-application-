
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, DollarSign, Camera, LogOut, Bell } from "lucide-react";
import StudentAttendance from "./StudentAttendance";
import StudentFees from "./StudentFees";
import Gallery from "./Gallery";

interface ParentPortalProps {
  onLogout: () => void;
}

const ParentPortal = ({ onLogout }: ParentPortalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock student data - in real app, this would come from backend
  const studentData = {
    name: "Rahul Sharma",
    class: "5A",
    rollNumber: "23",
    attendancePercentage: 92,
    pendingFees: 2500,
    totalFees: 15000
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Parent Portal</h1>
              <p className="text-sm text-gray-600">Welcome back, Parent of {studentData.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{studentData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Class</p>
                    <p className="font-semibold">{studentData.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Roll Number</p>
                    <p className="font-semibold">{studentData.rollNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Attendance
                  </CardTitle>
                  <Calendar className="h-6 w-6 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{studentData.attendancePercentage}%</div>
                  <p className="text-sm text-gray-600">This month</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Pending Fees
                  </CardTitle>
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">₹{studentData.pendingFees}</div>
                  <p className="text-sm text-gray-600">Due in 2 days</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Gallery Updates
                  </CardTitle>
                  <Camera className="h-6 w-6 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">12</div>
                  <p className="text-sm text-gray-600">New photos this week</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <Bell className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-800">Fee Reminder</p>
                      <p className="text-sm text-orange-600">Monthly fee of ₹2,500 is due in 2 days</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Camera className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">New Photos</p>
                      <p className="text-sm text-blue-600">Annual sports day photos have been uploaded</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <StudentAttendance studentName={studentData.name} />
          </TabsContent>

          <TabsContent value="fees">
            <StudentFees studentData={studentData} />
          </TabsContent>

          <TabsContent value="gallery">
            <Gallery />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ParentPortal;
