
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Video, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

const MediaUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "sports-day-2024.jpg",
      type: "image",
      size: "2.5 MB",
      uploadDate: "2024-01-10",
      description: "Annual sports day celebration"
    },
    {
      id: 2,
      name: "graduation-ceremony.mp4",
      type: "video",
      size: "15.2 MB",
      uploadDate: "2024-01-08",
      description: "Grade 5 graduation ceremony"
    },
    {
      id: 3,
      name: "science-fair.jpg",
      type: "image",
      size: "1.8 MB",
      uploadDate: "2024-01-05",
      description: "Students presenting science projects"
    }
  ]);

  const [newFileDescription, setNewFileDescription] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadDate: new Date().toISOString().split('T')[0],
        description: newFileDescription || `Uploaded ${file.name}`
      };
      
      setUploadedFiles(prev => [newFile, ...prev]);
      toast.success(`${file.name} uploaded successfully!`);
    });
    setNewFileDescription("");
  };

  const deleteFile = (id: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast.success("File deleted successfully");
  };

  const getFileIcon = (type: string) => {
    return type === 'image' ? <Camera className="h-5 w-5" /> : <Video className="h-5 w-5" />;
  };

  const getFileTypeBadge = (type: string) => {
    return type === 'image' 
      ? <Badge className="bg-blue-100 text-blue-800">Image</Badge>
      : <Badge className="bg-purple-100 text-purple-800">Video</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-purple-600" />
            Media Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a description for the uploaded media..."
              value={newFileDescription}
              onChange={(e) => setNewFileDescription(e.target.value)}
              className="mt-1"
            />
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <Upload className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <p className="text-lg font-medium">Drag and drop files here</p>
                <p className="text-gray-600">or click to browse</p>
              </div>
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button asChild className="cursor-pointer">
                  <span>Choose Files</span>
                </Button>
              </Label>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>• Supported formats: JPG, PNG, GIF, MP4, MOV, AVI</p>
            <p>• Maximum file size: 50MB per file</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Media ({uploadedFiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No media files uploaded yet</p>
              </div>
            ) : (
              uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-600">{file.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getFileTypeBadge(file.type)}
                        <span className="text-xs text-gray-500">{file.size}</span>
                        <span className="text-xs text-gray-500">• {new Date(file.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => deleteFile(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaUpload;
