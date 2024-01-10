import { NewsContents } from "@/api/NewsApi"
import { Regions, SubRegions } from "@/api/RegionApi"
import AdvertisementBar from "@/views/News/components/AdvertisementBar"
import Advertisements from "@/views/News/components/Advertisements"
import EditorPicks from "@/views/News/components/EditorsPick"
import LiveNews from "@/views/News/components/LiveNews"
import MostReadNews from "@/views/News/components/MostReadNews"
import NewsCountryWorldLayout from "@/views/News/components/NewsCountryHomeLayout"
import NewsOfTheWeek from "@/views/News/components/NewsOfTheWeek"
import PopularFaces from "@/views/News/components/PopularFaces"

import { useView } from "@/hooks/useView"
import Emptystate from "@/components/Emptystate"

export default function NewsTemplateOne({
  regionData,
  categoryId,
  newsContentsData,
  subRegions = [],
  regionId,
}: {
  regionData: Regions
  newsContentsData: NewsContents
  subRegions: SubRegions[]
  regionId: number
  categoryId: string
}) {
  const { getCrumbs } = useView()
  const currentLink = getCrumbs()
  const currentLinkList = currentLink.split("/")
  return (
    <>
      <div className="mt-1 flex flex-col flex-wrap justify-between gap-6 md:flex-row md:flex-nowrap lg:items-start">
        {regionData &&
          newsContentsData &&
          (newsContentsData.rows.length < 1 ? (
            <Emptystate />
          ) : (
            <NewsCountryWorldLayout
              newsContent={newsContentsData ?? []}
              // newsContent={[]}
              color={regionData.page_color ?? "black"}
              // color={"black"}
              subRegions={subRegions ?? []}
            />
          ))}
        <div className="basis-[220px] space-y-8">
          <LiveNews regionId={regionId} />
          <AdvertisementBar src="/news/advertisement.png" />
          <EditorPicks regionId={regionId} />
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
      currentLinkList={currentLinkList} 
      />
    </>
  )
}
