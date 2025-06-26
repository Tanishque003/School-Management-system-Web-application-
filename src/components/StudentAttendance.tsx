
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface StudentAttendanceProps {
  studentName: string;
}

const StudentAttendance = ({ studentName }: StudentAttendanceProps) => {
  // Mock attendance data
  const attendanceData = [
    { date: "2024-01-15", status: "present" },
    { date: "2024-01-14", status: "present" },
    { date: "2024-01-13", status: "absent" },
    { date: "2024-01-12", status: "present" },
    { date: "2024-01-11", status: "present" },
    { date: "2024-01-10", status: "late" },
    { date: "2024-01-09", status: "present" },
    { date: "2024-01-08", status: "present" },
  ];

  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter(day => day.status === "present").length;
  const lateDays = attendanceData.filter(day => day.status === "late").length;
  const absentDays = attendanceData.filter(day => day.status === "absent").length;
  const attendancePercentage = Math.round(((presentDays + lateDays) / totalDays) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            {studentName}'s Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{attendancePercentage}%</div>
                    <p className="text-sm text-gray-600">Overall</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">{presentDays}</div>
                <p className="text-sm text-gray-600">Present Days</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-yellow-600">{lateDays}</div>
                <p className="text-sm text-gray-600">Late Days</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-red-600">{absentDays}</div>
                <p className="text-sm text-gray-600">Absent Days</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                    </div>
                    {getStatusBadge(day.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {attendancePercentage < 75 && (
            <Card className="border-l-4 border-l-orange-500 bg-orange-50">
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">Attendance Alert</p>
                    <p className="text-sm text-orange-600">
                      Current attendance is below 75%. Please ensure regular attendance to meet school requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAttendance;
