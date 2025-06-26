
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Play, Calendar, Eye } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Mock gallery data
  const mediaItems = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      type: "image",
      category: "sports",
      date: "2024-01-10",
      thumbnail: "/api/placeholder/300/200",
      description: "Students participating in various sports activities during the annual sports day celebration.",
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    {
      id: 2,
      title: "Science Fair Exhibition",
      type: "image",
      category: "academic",
      date: "2024-01-05",
      thumbnail: "/api/placeholder/300/200",
      description: "Students showcasing their innovative science projects and experiments.",
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    {
      id: 3,
      title: "Cultural Program",
      type: "video",
      category: "cultural",
      date: "2023-12-20",
      thumbnail: "/api/placeholder/300/200",
      description: "Annual cultural program featuring dance, music, and drama performances.",
      videoUrl: "/api/placeholder/video"
    },
    {
      id: 4,
      title: "Grade 5 Graduation",
      type: "image",
      category: "ceremony",
      date: "2023-12-15",
      thumbnail: "/api/placeholder/300/200",
      description: "Graduation ceremony for Grade 5 students moving to middle school.",
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    {
      id: 5,
      title: "Field Trip to Museum",
      type: "image",
      category: "educational",
      date: "2023-12-10",
      thumbnail: "/api/placeholder/300/200",
      description: "Educational field trip to the city museum for history and science learning.",
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    {
      id: 6,
      title: "Parent-Teacher Meeting",
      type: "video",
      category: "meeting",
      date: "2023-12-05",
      thumbnail: "/api/placeholder/300/200",
      description: "Highlights from the monthly parent-teacher interaction session.",
      videoUrl: "/api/placeholder/video"
    }
  ];

  const categories = [
    { id: "all", name: "All", count: mediaItems.length },
    { id: "sports", name: "Sports", count: mediaItems.filter(item => item.category === "sports").length },
    { id: "academic", name: "Academic", count: mediaItems.filter(item => item.category === "academic").length },
    { id: "cultural", name: "Cultural", count: mediaItems.filter(item => item.category === "cultural").length },
    { id: "ceremony", name: "Ceremonies", count: mediaItems.filter(item => item.category === "ceremony").length },
    { id: "educational", name: "Educational", count: mediaItems.filter(item => item.category === "educational").length },
  ];

  const filteredMedia = selectedCategory === "all" 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  const getMediaIcon = (type: string) => {
    return type === "image" ? <Camera className="h-4 w-4" /> : <Play className="h-4 w-4" />;
  };

  const getTypeBadge = (type: string) => {
    return type === "image" 
      ? <Badge className="bg-blue-100 text-blue-800">Photos</Badge>
      : <Badge className="bg-purple-100 text-purple-800">Video</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-purple-600" />
            School Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </AspectRatio>
                  <div className="absolute top-2 right-2 flex gap-2">
                    {getTypeBadge(item.type)}
                  </div>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedMedia(item)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {getMediaIcon(item.type)}
                              {item.title}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(item.date).toLocaleDateString()}</span>
                              </div>
                              {getTypeBadge(item.type)}
                            </div>
                            <p className="text-gray-700">{item.description}</p>
                            
                            {item.type === "image" && item.images && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {item.images.map((image, index) => (
                                  <div key={index} className="relative">
                                    <AspectRatio ratio={4 / 3}>
                                      <img
                                        src={image}
                                        alt={`${item.title} - Image ${index + 1}`}
                                        className="object-cover w-full h-full rounded-lg"
                                      />
                                    </AspectRatio>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {item.type === "video" && (
                              <div className="relative">
                                <AspectRatio ratio={16 / 9}>
                                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                      <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                      <p className="text-gray-600">Video Player</p>
                                      <p className="text-sm text-gray-500">Click to play video</p>
                                    </div>
                                  </div>
                                </AspectRatio>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No media found</h3>
              <p className="text-gray-500">No {selectedCategory === "all" ? "" : selectedCategory} content available at the moment.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Gallery;
