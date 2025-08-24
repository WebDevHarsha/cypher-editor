"use client";

import { useState } from "react";
import EditorCard from "@/components/EditorCard";
import { StepHeader } from "@/components/StepHeader";
import { ImagePreview } from "@/components/ImagePreview";
import { Sparkles, Image as ImageIcon, Megaphone, Search } from "lucide-react";

type AgentResult = { result?: string; status?: string };

export default function Page() {
  const [topic, setTopic] = useState("");
  const [research, setResearch] = useState<string>("");
  const [researchApproved, setResearchApproved] = useState(false);

  const [caption, setCaption] = useState<string>("");
  const [captionApproved, setCaptionApproved] = useState(false);

  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageApproved, setImageApproved] = useState(false);

  const [publishResp, setPublishResp] = useState<string>("");

  async function doResearch() {
    const res = await fetch(`/api/agents/research?topic=${encodeURIComponent(topic || "AI trends")}`);
    const data: AgentResult = await res.json();
    setResearch(data.result || "");
    setResearchApproved(false);
  }

  async function doCreative() {
    const res = await fetch(`/api/agents/creative`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: research
      })
    });
    const data: AgentResult = await res.json();
    setCaption(data.result || "");
    setCaptionApproved(false);
    if (!imagePrompt) setImagePrompt(`Create a social graphic for: ${topic || "AI trends"}`);
  }

  async function doImage() {
    const res = await fetch(`/api/agents/image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: imagePrompt || `A futuristic robot holding a red skateboard, cinematic, high detail`
      })
    });
    const data = await res.json();
    setImageDataUrl(data.result || null);
    setImageApproved(false);
  }

  async function doPublish() {
    const res = await fetch(`/api/agents/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: caption,
        image: imageDataUrl
      })
    });
    const data = await res.json();
    setPublishResp(data.status || "Posted (mock)");
  }

  return (
    <main className="container py-8 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cypher Editor</h1>
          <p className="text-neutral-500">
            4-Agent showcase • Research → Creative → Image → Publish
          </p>
        </div>
        <div className="text-sm text-neutral-500">
          Tip: Press <span className="kbd">Ctrl</span> + <span className="kbd">K</span> to focus topic
        </div>
      </header>

      {/* Step 1: Research */}
      <div className="card p-6 space-y-5">
        <StepHeader index={1} title="Research Agent" status={researchApproved ? "approved" : "pending"} />
        <div className="grid md:grid-cols-[1fr_auto] gap-3">
          <input
            id="topic"
            className="input"
            placeholder="e.g., AI startups in 2025"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button className="btn-primary" onClick={doResearch}>
            <Search size={16} /> Fetch Trends
          </button>
        </div>
        <EditorCard
          title="Research Output"
          description="Review & approve before moving to caption."
          actions={
            <button
              className="btn-secondary"
              onClick={() => setResearchApproved((v) => !v)}
              disabled={!research}
              title={!research ? "Run research first" : ""}
            >
              {researchApproved ? "Unapprove" : "Approve"}
            </button>
          }
        >
          <textarea
            className="textarea"
            placeholder="Research will appear here..."
            value={research}
            onChange={(e) => setResearch(e.target.value)}
          />
        </EditorCard>
      </div>

      {/* Step 2: Creative */}
      <div className="card p-6 space-y-5 opacity-100">
        <StepHeader index={2} title="Creative Agent" status={captionApproved ? "approved" : "pending"} />
        <div className="flex gap-3">
          <button
            className="btn-primary"
            onClick={doCreative}
            disabled={!researchApproved || !research}
            title={!researchApproved ? "Approve research first" : ""}
          >
            <Sparkles size={16} /> Generate Caption
          </button>
          <button
            className="btn-secondary"
            onClick={() =>
              setCaption(
                (caption || "Sample caption") + " #AI #Trends"
              )
            }
          >
            Quick Hashtags
          </button>
        </div>
        <EditorCard
          title="Caption"
          description="Edit as needed, then approve to generate image."
          actions={
            <button
              className="btn-secondary"
              onClick={() => setCaptionApproved((v) => !v)}
              disabled={!caption}
              title={!caption ? "Generate or write a caption first" : ""}
            >
              {captionApproved ? "Unapprove" : "Approve"}
            </button>
          }
        >
          <textarea
            className="textarea"
            placeholder="Caption will appear here..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </EditorCard>
      </div>

      {/* Step 3: Image */}
      <div className="card p-6 space-y-5">
        <StepHeader index={3} title="Image Agent" status={imageApproved ? "approved" : "pending"} />
        <div className="grid md:grid-cols-[1fr_auto] gap-3">
          <input
            className="input"
            placeholder="Prompt for the image..."
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={doImage}
            disabled={!captionApproved}
            title={!captionApproved ? "Approve caption first" : ""}
          >
            <ImageIcon size={16} /> Generate Image
          </button>
        </div>
        <EditorCard
          title="Generated Image"
          description="Approve before publishing."
          actions={
            <button
              className="btn-secondary"
              onClick={() => setImageApproved((v) => !v)}
              disabled={!imageDataUrl}
              title={!imageDataUrl ? "Generate an image first" : ""}
            >
              {imageApproved ? "Unapprove" : "Approve"}
            </button>
          }
        >
          <ImagePreview dataUrl={imageDataUrl} />
        </EditorCard>
      </div>

      {/* Step 4: Publish */}
      <div className="card p-6 space-y-5">
        <StepHeader index={4} title="Publishing Agent" status={publishResp ? "approved" : "pending"} />
        <div className="flex gap-3">
          <button
            className="btn-primary"
            onClick={doPublish}
            disabled={!researchApproved || !captionApproved || !imageApproved}
            title={
              !researchApproved
                ? "Approve research"
                : !captionApproved
                ? "Approve caption"
                : !imageApproved
                ? "Approve image"
                : ""
            }
          >
            <Megaphone size={16} /> Publish
          </button>
          {publishResp && (
            <span className="badge">Result: {publishResp}</span>
          )}
        </div>
        <EditorCard
          title="Post Preview"
          description="What will be published."
        >
          <div className="space-y-3">
            <p className="text-sm text-neutral-500">Caption</p>
            <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
              {caption || <em>Empty</em>}
            </div>
            <p className="text-sm text-neutral-500 mt-3">Image</p>
            <ImagePreview dataUrl={imageDataUrl} />
          </div>
        </EditorCard>
      </div>
    </main>
  );
}
