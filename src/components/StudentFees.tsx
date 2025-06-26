
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, Clock, AlertTriangle, Copy } from "lucide-react";
import { toast } from "sonner";

interface StudentData {
  name: string;
  class: string;
  rollNumber: string;
  attendancePercentage: number;
  pendingFees: number;
  totalFees: number;
}

interface StudentFeesProps {
  studentData: StudentData;
}

const StudentFees = ({ studentData }: StudentFeesProps) => {
  const paidFees = studentData.totalFees - studentData.pendingFees;
  const feePercentage = Math.round((paidFees / studentData.totalFees) * 100);
  
  // Mock payment history
  const paymentHistory = [
    { date: "2023-12-15", amount: 2500, method: "UPI", status: "completed", receipt: "RCP001" },
    { date: "2023-11-15", amount: 2500, method: "Bank Transfer", status: "completed", receipt: "RCP002" },
    { date: "2023-10-15", amount: 2500, method: "UPI", status: "completed", receipt: "RCP003" },
    { date: "2023-09-15", amount: 2500, method: "Cash", status: "completed", receipt: "RCP004" },
    { date: "2023-08-15", amount: 2500, method: "UPI", status: "completed", receipt: "RCP005" },
  ];

  const upcomingDueDate = "2024-01-17";
  const daysUntilDue = Math.ceil((new Date(upcomingDueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Fee Information - {studentData.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-blue-600">₹{studentData.totalFees.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Total Annual Fees</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">₹{paidFees.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Paid Amount ({feePercentage}%)</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-orange-600">₹{studentData.pendingFees.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Pending Amount</p>
              </CardContent>
            </Card>
          </div>

          {studentData.pendingFees > 0 && (
            <Card className={`border-l-4 mb-6 ${daysUntilDue <= 2 ? 'border-l-red-500 bg-red-50' : 'border-l-yellow-500 bg-yellow-50'}`}>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-3">
                  {daysUntilDue <= 2 ? (
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  ) : (
                    <Clock className="h-6 w-6 text-yellow-600" />
                  )}
                  <div>
                    <p className={`font-medium ${daysUntilDue <= 2 ? 'text-red-800' : 'text-yellow-800'}`}>
                      {daysUntilDue <= 2 ? 'Urgent: Fee Due Soon!' : 'Fee Reminder'}
                    </p>
                    <p className={`text-sm ${daysUntilDue <= 2 ? 'text-red-600' : 'text-yellow-600'}`}>
                      ₹{studentData.pendingFees} due on {new Date(upcomingDueDate).toLocaleDateString()} 
                      ({daysUntilDue} days remaining)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">UPI Payment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">UPI ID:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">school@paytm</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => copyToClipboard("school@paytm")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">QR Code:</span>
                        <span className="text-blue-600 text-sm">Available at school office</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">Bank Transfer</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Account No:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">1234567890</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => copyToClipboard("1234567890")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">IFSC Code:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">SBIN0001234</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => copyToClipboard("SBIN0001234")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Bank:</span>
                        <span className="font-medium">State Bank of India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Please mention student name and roll number ({studentData.rollNumber}) 
                  in the payment reference for faster processing.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(payment.date).toLocaleDateString()} • {payment.method}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(payment.status)}
                      <p className="text-xs text-gray-500 mt-1">Receipt: {payment.receipt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentFees;
