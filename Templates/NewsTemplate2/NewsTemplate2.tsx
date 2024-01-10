import { NewsContents } from "@/api/NewsApi"
import { Regions, SubRegions } from "@/api/RegionApi"
import AdvertisementBar from "@/views/News/components/AdvertisementBar"
import Advertisements from "@/views/News/components/Advertisements"
import EditorPicks from "@/views/News/components/EditorsPick"
import LiveNews from "@/views/News/components/LiveNews"
import MostReadNews from "@/views/News/components/MostReadNews"
import NewsOfTheWeek from "@/views/News/components/NewsOfTheWeek"
import PopularFaces from "@/views/News/components/PopularFaces"

import LinkToView from "@/lib/ViewLayoutWrapper"
import { useView } from "@/hooks/useView"
import Card from "@/components/common/Card/Card"
import Emptystate from "@/components/Emptystate"

export default function NewsTemplateTwo({
  regionData,
  categoryId,
  newsContentsData,
  subRegions = [],
  regionId,
}: {
  regionData: Regions
  categoryId: string
  regionId: number
  newsContentsData: NewsContents
  subRegions: SubRegions[]
}) {
  const { getCrumbs, category, parentLink } = useView()
  const currentLink = getCrumbs()
  const currentLinkList = currentLink.split("/")
  return (
    <>
      <div className="mt-1 flex flex-col flex-wrap items-start justify-between gap-6 md:flex-row md:flex-nowrap">
        {regionData &&
          newsContentsData &&
          (newsContentsData.rows.length < 1 ? (
            <Emptystate />
          ) : (
            <div className="w-full lg:basis-[80%]">
              
              
              <LinkToView
                to={`/news/world/view/${
                  newsContentsData.rows[0].heading_news_id
                }?category=${category}&prevRegions=${encodeURIComponent(
                  JSON.stringify(currentLinkList)
                )}`}
                state={{
                  currentLink,
                  parentLink,
                  color: regionData.page_color,
                  subRegions,
                  category,
                }}
              >
                
                <div className="flex flex-col gap-4 ">
                  <div className="content basis-[35%]">
                    <h1 className="text-4xl font-bold">
                      {newsContentsData.rows[0].title}
                    </h1>
                    <p className="line-clamp-[10] text-lg font-light">
                      {newsContentsData.rows[0].short_description}
                    </p>
                    
                    
                  </div>
                  <div className="basis-[80%]  bg-gray-300 md:min-h-[350px]">
                    <img
                      src={newsContentsData.rows[0].thumbnail_url}
                      alt={newsContentsData.rows[0].title}
                      className="h-full w-full bg-cover"
                    />
                    
                  </div>
                </div>
              </LinkToView>
              <div className="mt-8 grid max-w-7xl grid-cols-1 place-items-start gap-x-4 gap-y-4 sm:grid-cols-2">
                {newsContentsData.rows.slice(1, 3).map((content) => {
                  if (!content) {
                    return null
                  }
                  return (
                    <Card
                      key={content.id}
                      color={regionData.page_color ?? "black"}
                      subRegions={subRegions ?? []}
                      id={content.heading_news_id}
                      imgAlt={content.title}
                      imgSrc={content.thumbnail_url}
                      title={content.title}
                      currentLinkList={currentLinkList}
                      secondaryTitle={content.short_description}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        <div className="basis-[220px] space-y-4">
          <LiveNews regionId={regionId} />
          <AdvertisementBar src="/news/advertisement.png" />
          <EditorPicks regionId={regionData.id} />
        </div>
      </div>

      {/* Advertisement */}
      <Advertisements currentLinkList={currentLinkList} />

      <MostReadNews
        categoryId={categoryId}
        regionId={regionId}
        currentLinkList={currentLinkList}
      />
      {/* News of the week */}
      <NewsOfTheWeek
        categoryId={categoryId}
        regionId={regionId}
        currentLinkList={currentLinkList}
      />
      <PopularFaces 
      categoryId={categoryId}
      regionId={regionId}
      currentLinkList={currentLinkList} />
    </>
  )
}
