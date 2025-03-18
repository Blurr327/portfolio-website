import Container from "@/components/Container";
import CountUp from "@/components/CountUp";
import Image from "next/image";
import FMComponent from "@/components/FMComponent";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { Users, Hourglass, Hammer, Handshake } from "lucide-react";
import { getHomePageData } from "@/lib/home";
import { getArticles } from "@/lib/blog";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

export default async function Home() {
  const data = await getHomePageData();
  const articles = await getArticles(() => true, [0, 3]);

  const images: string[] = articles
    .filter((article) => article.thumbnail !== undefined)
    .map((article) => "/" + article.thumbnail);

  return (
    <>
      <Container>
        <div className="w-full mb-12">
          <header className="flex flex-col justify-start items-start">
            <h1 className="md:text-5xl font-bold tracking-tight text-shadow text-zinc-900 text-4xl">
              {data.title}
            </h1>
            <p className="mt-6 text-base md:text-2xl text-zinc-500 mb-12">
              {data.description}
            </p>
          </header>
          <div className="w-full flex flex-wrap gap-6">
            <Carousel
              images={data.images.map((img) => "/" + img)}
              desktopHeight={450}
            />
            <div className="flex-1 prose p-8">
              <Markdown remarkPlugins={[remarkGfm]}>{data.intro}</Markdown>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-24">
          <FMComponent
            className="flex flex-col items-center justify-center"
            amount={0.5}
          >
            <p className="text-zinc-900 self-start text-5xl font-bold">
              Quelques chiffres...
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 w-[70%] gap-12 justify-items-center m-24 p-12 px-4">
              <div className="flex flex-col gap-4 items-center">
                Membres
                <Users className="w-16 h-16" />
                <CountUp targetNumber={data.stats.member_count} />
              </div>

              <div className="flex flex-col gap-4 items-center">
                Années
                <Hourglass className="w-16 h-16" />
                <CountUp targetNumber={data.stats.years} />
              </div>

              <div className="flex flex-col gap-4 items-center">
                Projets
                <Hammer className="w-16 h-16" />
                <CountUp targetNumber={data.stats.project_count} />
              </div>

              <div className="flex flex-col gap-4 items-center">
                Partenaires
                <Handshake className="w-16 h-16" />
                <CountUp targetNumber={data.stats.partner_count} />
              </div>
            </div>
          </FMComponent>
          <FMComponent className="flex flex-wrap items-center justify-center gap-6">
            <Image
              src={"/" + data.images[0]}
              alt="JCI GROUP"
              width="700"
              height="500"
              className="h-[250px] md:h-[400px] rounded-3xl object-cover"
            />
            <div className="flex-1 prose p-8">
              <Markdown>{data.first_text}</Markdown>
            </div>
          </FMComponent>
          <FMComponent className="flex flex-wrap items-center justify-center">
            <Image
              src={"/" + data.images[1]}
              alt="JCI GROUP"
              width="700"
              height="500"
              className="h-[250px] md:h-[400px] rounded-3xl object-cover"
            />
            <div className="flex-1 prose p-8 md:order-first">
              <Markdown>{data.second_text}</Markdown>
            </div>
          </FMComponent>
          <FMComponent className="flex flex-wrap items-center">
            <p className="mt-6 text-2xl text-center text-zinc-900 p-4">
              <Link href="/blog" className="font-bold underline">
                Keep up with us !{" "}
                <ChevronRightIcon className="w-8 h-8 inline" />
              </Link>
            </p>
            <Carousel images={images} />
          </FMComponent>
        </div>
      </Container>
    </>
  );
}
