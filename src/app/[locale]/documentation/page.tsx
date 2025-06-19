"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const DocumentationPage = () => {
    const t = useTranslations("Documentation");
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (sectionId: string) => {
        setActiveSection(activeSection === sectionId ? null : sectionId);
    };

    const sections = [
        {
            id: "yolo-architecture",
            title: "YOLOv11 Architecture",
            content: (
                <div className="space-y-4">
                    <p>
                        YOLOv11 (You Only Look Once version 11) is our modified version of the state-of-the-art object detection architecture.
                        Key improvements include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Enhanced feature extraction with CSPDarknet53 backbone</li>
                        <li>Modified PANet for better feature fusion</li>
                        <li>Efficient spatial pyramid pooling (ESPP) module</li>
                        <li>Optimized anchor boxes for oil spill detection</li>
                    </ul>
                    <p>
                        The model achieves 98.7% accuracy in oil spill segmentation by leveraging multi-scale feature maps and advanced attention mechanisms.
                    </p>
                </div>
            )
        },
        {
            id: "neural-networks",
            title: "Neural Network Training",
            content: (
                <div className="space-y-4">
                    <p>
                        Our neural network was trained on a dataset of over 50,000 annotated satellite images of oil spills from various sources:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Sentinel-1 SAR images</li>
                        <li>Landsat 8/9 multispectral data</li>
                        <li>Custom drone-captured spill scenarios</li>
                        <li>Historical spill events (Deepwater Horizon, etc.)</li>
                    </ul>
                    <p>
                        Training utilized transfer learning with pre-trained weights on similar tasks, followed by fine-tuning with our specialized dataset.
                    </p>
                </div>
            )
        },
        {
            id: "processing-pipeline",
            title: "Image Processing Pipeline",
            content: (
                <div className="space-y-4">
                    <p>The complete processing workflow includes:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Image acquisition from satellite sources</li>
                        <li>Pre-processing (radiometric correction, noise reduction)</li>
                        <li>Multi-spectral analysis (visible, IR, UV bands)</li>
                        <li>AI-based segmentation with YOLOv11</li>
                        <li>Post-processing (false positive filtering)</li>
                        <li>Visualization and reporting</li>
                    </ol>
                    <p>
                        The entire pipeline takes less than 2 seconds per image on our cloud infrastructure.
                    </p>
                </div>
            )
        },
        {
            id: "api-integration",
            title: "API Integration",
            content: (
                <div className="space-y-4">
                    <p>Our system provides RESTful API endpoints for integration:</p>
                    <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            {`POST /api/v1/analyze
Content-Type: multipart/form-data

{
  "image": "base64_encoded_image_or_url",
  "options": {
    "detailed_report": true,
    "confidence_threshold": 0.85
  }
}`}
          </pre>
                    <p>
                        Responses include GeoJSON polygons of detected spills with confidence scores and estimated volumes.
                    </p>
                </div>
            )
        },
        {
            id: "deployment",
            title: "Deployment Architecture",
            content: (
                <div className="space-y-4">
                    <p>Our cloud-native solution is deployed using:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Kubernetes clusters for orchestration</li>
                        <li>GPU-accelerated nodes for model inference</li>
                        <li>Redis for caching frequent requests</li>
                        <li>Prometheus/Grafana for monitoring</li>
                        <li>CI/CD pipelines for seamless updates</li>
                    </ul>
                    <p>
                        The system automatically scales to handle thousands of concurrent analysis requests.
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-2 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {t("title") || "Technical Documentation"}
                </h1>

                <div className="space-y-4">
                    {sections.map((section) => (
                        <div key={section.id} className="border-b border-gray-700 pb-4">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between text-left py-4 focus:outline-none group"
                            >
                                <div className="flex items-center">
                                    <span className="mr-4 text-blue-400">
                                        {activeSection === section.id ? (
                                            <FaChevronDown className="h-5 w-5" />
                                        ) : (
                                            <FaChevronRight className="h-5 w-5" />
                                        )}
                                    </span>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold group-hover:text-blue-300 transition-colors">
                                        {section.title}
                                    </h2>
                                </div>
                            </button>

                            {activeSection === section.id && (
                                <div className="pl-2 sm:pl-12 pr-2 sm:pr-4 pt-2 pb-6 text-gray-300 text-base sm:text-lg">
                                    {section.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;