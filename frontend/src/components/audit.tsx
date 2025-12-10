import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Loader2, CheckCircle, AlertTriangle, FileUp } from "lucide-react";

interface AuditResponse {
    summary: string;
    issues?: string[];
    score?: number;
}

const Audit = () => {
    const [subject, setSubject] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<AuditResponse | null>(null);
    const [error, setError] = useState<string>("");

    const handleTextAudit = async () => {
        if (!subject.trim()) return;

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await axiosInstance.post<AuditResponse>("/audit/text", {
                subject,
            });

            setResult(res.data);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Audit failed");
        } finally {
            setLoading(false);
        }
    };

    const handleFileAudit = async () => {
        if (!file) {
            setError("Please upload a file.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await axiosInstance.post<AuditResponse>("/audit/file", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setResult(res.data);
        } catch (err: any) {
            setError(err?.response?.data?.message || "File audit failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="bg-white p-6 shadow rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800">Audit Center</h2>
                <p className="text-gray-500 text-sm">
                    Choose between a text audit or file audit.
                </p>
            </div>

            {/* --- TEXT AUDIT --- */}
            <div className="bg-white p-6 shadow rounded-xl space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Text Audit</h3>

                <textarea
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border rounded-lg min-h-[140px]"
                    placeholder="Describe your process or operation to audit..."
                />

                <button
                    onClick={handleTextAudit}
                    disabled={loading || !subject.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Run Text Audit
                </button>
            </div>

            {/* --- FILE AUDIT --- */}
            <div className="bg-white p-6 shadow rounded-xl space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">File Audit</h3>

                <div className="border p-4 rounded-lg bg-gray-50 text-center">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                    >
                        <FileUp className="w-10 h-10 text-blue-500" />
                        <span className="text-gray-600">
                            {file ? file.name : "Click to upload a document"}
                        </span>
                    </label>
                </div>

                <button
                    onClick={handleFileAudit}
                    disabled={loading || !file}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Run File Audit
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <p>{error}</p>
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="bg-white p-6 shadow rounded-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-600 w-6 h-6" />
                        <h3 className="text-xl font-semibold text-gray-800">Audit Results</h3>
                    </div>

                    <p className="text-gray-700"><strong>Summary:</strong> {result.summary}</p>

                    {result.issues && (
                        <div>
                            <h4 className="font-semibold text-gray-700 mt-2">Issues Found</h4>
                            <ul className="list-disc ml-6 space-y-1 text-gray-600">
                                {result.issues.map((issue, i) => (
                                    <li key={i}>{issue}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {result.score !== undefined && (
                        <p className="text-gray-700">
                            <strong>Score:</strong> {result.score}%
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Audit;
