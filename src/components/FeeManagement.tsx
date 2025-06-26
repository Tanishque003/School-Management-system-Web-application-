
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, Edit, Eye, Bell } from "lucide-react";
import { toast } from "sonner";

const FeeManagement = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock student fee data
  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      rollNumber: "23",
      class: "5A",
      totalFees: 15000,
      paidFees: 12500,
      pendingFees: 2500,
      dueDate: "2024-01-15",
      status: "pending",
      registrationDate: "2023-04-15"
    },
    {
      id: 2,
      name: "Priya Patel",
      rollNumber: "24",
      class: "5A",
      totalFees: 15000,
      paidFees: 15000,
      pendingFees: 0,
      dueDate: "2024-01-15",
      status: "paid",
      registrationDate: "2023-04-20"
    },
    {
      id: 3,
      name: "Amit Kumar",
      rollNumber: "25",
      class: "5A",
      totalFees: 15000,
      paidFees: 10000,
      pendingFees: 5000,
      dueDate: "2024-01-10",
      status: "overdue",
      registrationDate: "2023-04-18"
    },
  ];

  const classes = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const sendReminder = (studentName: string) => {
    toast.success(`Fee reminder sent to ${studentName}'s parents`);
  };

  const updateFeeStatus = (studentId: number, newStatus: string) => {
    toast.success("Fee status updated successfully");
  };

  const filteredStudents = selectedClass
    ? students.filter(student => student.class === selectedClass)
    : students;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Fee Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="class-filter">Filter by Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">
                  ₹{filteredStudents.reduce((sum, s) => sum + s.paidFees, 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total Collected</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-yellow-600">
                  ₹{filteredStudents.reduce((sum, s) => sum + s.pendingFees, 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Pending Amount</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-red-600">
                  {filteredStudents.filter(s => s.status === "overdue").length}
                </div>
                <p className="text-sm text-gray-600">Overdue Students</p>
              </CardContent>
            </Card>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b">
              <h3 className="font-semibold">Student Fee Details</h3>
            </div>
            <div className="divide-y">
              {filteredStudents.map((student) => (
                <div key={student.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{student.rollNumber}</span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">Class: {student.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-semibold">₹{student.pendingFees}</p>
                        <p className="text-sm text-gray-600">Pending</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Due: {new Date(student.dueDate).toLocaleDateString()}</p>
                        {getStatusBadge(student.status)}
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Fee Details - {student.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Total Fees</Label>
                                  <p className="font-semibold">₹{student.totalFees}</p>
                                </div>
                                <div>
                                  <Label>Paid Amount</Label>
                                  <p className="font-semibold text-green-600">₹{student.paidFees}</p>
                                </div>
                                <div>
                                  <Label>Pending Amount</Label>
                                  <p className="font-semibold text-red-600">₹{student.pendingFees}</p>
                                </div>
                                <div>
                                  <Label>Due Date</Label>
                                  <p className="font-semibold">{new Date(student.dueDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="border-t pt-4">
                                <Label>Payment Details</Label>
                                <div className="mt-2 p-3 bg-gray-50 rounded">
                                  <p className="text-sm"><strong>UPI ID:</strong> school@paytm</p>
                                  <p className="text-sm"><strong>Account:</strong> 1234567890</p>
                                  <p className="text-sm"><strong>IFSC:</strong> SBIN0001234</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => updateFeeStatus(student.id, "paid")}
                                  className="flex-1"
                                >
                                  Mark as Paid
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => sendReminder(student.name)}
                                >
                                  <Bell className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendReminder(student.name)}
                        >
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeManagement;
