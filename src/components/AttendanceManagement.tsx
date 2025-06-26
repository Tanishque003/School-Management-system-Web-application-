
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, X, Search } from "lucide-react";

const AttendanceManagement = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock student data
  const students = [
    { id: 1, name: "Rahul Sharma", rollNumber: "23", status: "present" },
    { id: 2, name: "Priya Patel", rollNumber: "24", status: "present" },
    { id: 3, name: "Amit Kumar", rollNumber: "25", status: "absent" },
    { id: 4, name: "Sneha Singh", rollNumber: "26", status: "present" },
    { id: 5, name: "Arjun Reddy", rollNumber: "27", status: "late" },
  ];

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => ({
      ...acc,
      [student.id]: student.status
    }), {})
  );

  const classes = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      default:
        return <Badge variant="secondary">Not Marked</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Attendance Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="class-select">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-select">Date</Label>
              <Input
                id="date-select"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="search">Search Student</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Name or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {selectedClass && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b">
                <h3 className="font-semibold">Class {selectedClass} - {new Date(selectedDate).toLocaleDateString()}</h3>
              </div>
              <div className="divide-y">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{student.rollNumber}</span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">Roll No: {student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(attendance[student.id])}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={attendance[student.id] === "present" ? "default" : "outline"}
                          onClick={() => handleAttendanceChange(student.id, "present")}
                          className="h-8"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={attendance[student.id] === "absent" ? "destructive" : "outline"}
                          onClick={() => handleAttendanceChange(student.id, "absent")}
                          className="h-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={attendance[student.id] === "late" ? "secondary" : "outline"}
                          onClick={() => handleAttendanceChange(student.id, "late")}
                          className="h-8"
                        >
                          L
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedClass && (
            <div className="flex justify-end mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Save Attendance
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;
