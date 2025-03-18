import BasicLayout from "@/components/BasicLayout";
import { getJoinPageData } from "@/lib/join";
import JoinForm from "@/components/JoinForm";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Join() {
  const data = await getJoinPageData();

  return (
    <BasicLayout title={data.title} intro={data.subtitle}>
      <div className="flex flex-wrap gap-8">
        <div className="prose flex-1 mb-8">
          <Markdown remarkPlugins={[remarkGfm]}>{data.body}</Markdown>
        </div>
        {/* Only show the form if form is enabled */}
        {data.enable_form && <JoinForm />}
      </div>
    </BasicLayout>
  );
}
