import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { getHomePageData } from "@/lib/home";
import { getArticles } from "@/lib/blog";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

export default async function Home() {
  const data = await getHomePageData();
  const articles = await getArticles(() => true, [0, 3]);

  const images: string[] = articles
    .filter((article) => article.thumbnail !== undefined)
    .map((article) => "/portfolio-website/" + article.thumbnail);

  return (
    <>
      <Container>
        <div className="w-full mb-12">
          <header className="flex-col justify-center items-center md:grid md:grid-cols-4 md:grid-rows-2">
            <h1 className="md:text-5xl md:col-span-2 font-bold my-4 tracking-tight text-center text-4xl">
              {data.title}
            </h1>
            <p className="text-base text-center text-zinc-500 mb-12 md:text-2xl md:col-span-2 md:col-start-2 md:row-start-2">
              {data.description}
            </p>
          </header>
          <div className="w-full flex flex-wrap justify-end md:text-center gap-6">
            <div className="flex-1 prose p-8">
              <Markdown remarkPlugins={[remarkGfm]}>{data.intro}</Markdown>
            </div>
            <Image
              src={"/portfolio-website/" + data.images[0]}
              alt="Project Picture"
              width="700"
              height="500"
              className="h-[250px] md:h-[400px] rounded-3xl object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-24 md:border-l-2 md:border-black">
          <h1 className="md:text-5xl font-bold my-4 tracking-tight md:col-span-2 text-center text-4xl">
            Mes projets
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Image
              src={"/portfolio-website/" + data.images[1]}
              alt="Project Picture"
              width="700"
              height="500"
              className="h-[250px] md:h-[400px] rounded-3xl object-cover"
            />
            <div className="flex-1 prose p-8">
              <Markdown>{data.first_text}</Markdown>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <Image
              src={"/portfolio-website/" + data.images[2]}
              alt="Project Picture"
              width="700"
              height="500"
              className="h-[250px] md:h-[400px] rounded-3xl object-cover"
            />
            <div className="flex-1 prose p-8 md:order-first">
              <Markdown>{data.second_text}</Markdown>
            </div>
          </div>
          <div className="flex-col flex-wrap items-center">
            <Link href="/blog" className="font-bold">
              <p className="mt-6 text-2xl text-center text-zinc-900 p-4">
                Restez au courant de mes derniers projets et aventures{" "}
                <Carousel
                  images={images}
                  desktopHeight={400}
                  className="w-[80%] my-8"
                />
              </p>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
