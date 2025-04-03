"use client";

import { useState } from "react";

interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  prescription: string;
  documents: string[];
}

const sampleRecords: MedicalRecord[] = [
  {
    id: "1",
    date: "2024-03-15",
    doctorName: "Dr. John Smith",
    diagnosis: "Common Cold",
    prescription:
      "Paracetamol 500mg - 1 tablet thrice daily\nVitamin C 500mg - 1 tablet daily",
    documents: ["blood_test.pdf", "prescription.pdf"],
  },
  {
    id: "2",
    date: "2024-02-28",
    doctorName: "Dr. Sarah Johnson",
    diagnosis: "Skin Allergy",
    prescription:
      "Antihistamine 10mg - 1 tablet daily\nHydrocortisone cream - Apply twice daily",
    documents: ["allergy_test.pdf", "skin_analysis.pdf"],
  },
];

export default function MedicalRecords() {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Medical Records</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Records List */}
        <div className="space-y-4">
          {sampleRecords.map((record) => (
            <div
              key={record.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedRecord?.id === record.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setSelectedRecord(record)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{record.doctorName}</h3>
                <span className="text-sm text-gray-500">{record.date}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{record.diagnosis}</p>
            </div>
          ))}
        </div>

        {/* Record Details */}
        {selectedRecord ? (
          <div className="card space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Record Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Date</label>
                  <p className="font-medium">{selectedRecord.date}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Doctor</label>
                  <p className="font-medium">{selectedRecord.doctorName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Diagnosis</label>
                  <p className="font-medium">{selectedRecord.diagnosis}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Prescription</label>
                  <pre className="whitespace-pre-wrap font-medium bg-gray-50 p-3 rounded-md">
                    {selectedRecord.prescription}
                  </pre>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Documents</label>
                  <div className="space-y-2 mt-1">
                    {selectedRecord.documents.map((doc) => (
                      <button
                        key={doc}
                        className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-md text-blue-600"
                        onClick={() => console.log("Download:", doc)}
                      >
                        📄 {doc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card flex items-center justify-center text-gray-500">
            Select a record to view details
          </div>
        )}
      </div>
    </div>
  );
}
