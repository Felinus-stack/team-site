"use client";

import Container from "@/app/components/Container";
import Title from "@/app/components/Title";
import Button from "@/app/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 校企伙伴列表
const strategicSponsors = [
  { name: "hist.png", url: "https://www.hist.edu.cn" },
  { name: "htu.png", url: "https://www.htu.edu.cn" },
  { name: "xxu.png", url: "https://www.xxu.edu.cn" },
  { name: "xxgc.png", url: "https://www.xxgc.edu.cn" },
];

const platinumSponsors = [
  { name: "weibo.png", url: "https://weibo.com/" },
  { name: "MiHoYo.png", url: "https://www.mihoyo.com/" },
  { name: "kuaishou.png", url: "https://www.kuaishou.com/" },
  { name: "JD.png", url: "https://www.jd.com/" },
  { name: "DiDi.png", url: "https://www.didiglobal.com/" },
  { name: "baidu.png", url: "https://www.baidu.com/" },
  { name: "360.png", url: "https://www.360.cn/" },
  { name: "Ctrip.png", url: "https://www.ctrip.com/" },
  { name: "haluo.png", url: "https://www.haluo.com/" },
  { name: "weipai.png", url: "https://www.weipai.com/" },
  { name: "xiaomi.png", url: "https://www.mi.com/" },
  { name: "ByteDance.png", url: "https://www.bytedance.com/" },
  { name: "huawei.png", url: "https://www.huawei.com/" },
  { name: "alibaba.png", url: "https://www.alibaba.com/" },
  { name: "tongcheng.png", url: "https://www.ly.com/" },
  { name: "jinshanyun.png", url: "https://www.ksyun.com/" },
  { name: "yunzhi.png", url: "https://cloud.tencent.com/" },
  { name: "tengyu.png", url: "https://app-tc.mokahr.com/campus-recruitment/tencent-ieg/6023#/" },
  { name: "bluelogo.png", url: "https://www.bluefocusgroup.com/" },
  { name: "duxiaoman.png", url: "https://www.duxiaoman.com/" },
  { name: "FlashEx.png", url: "https://www.ishansong.com/" },
  { name: "haoweilai.png", url: "https://www.100tal.com/" },
  { name: "shuma.png", url: "https://www.digital-engine.com/" },
  { name: "tengdataiyuan.png", url: "https://www.tdology.com/" }
];

const goldSponsors = [
  {
    name: "adbl.png",
    url: "https://adbl.eu/",
  },
  { name: "airtech.png", url: "https://airtech.lu/" },
  { name: "filipowicz pawel.png", url: "https://www.pfpcnc.pl/" },
  { name: "avl.jpeg", url: "https://www.avl.com/en" },
  { name: "ams świdnica.png", url: "https://ams-at.eu/" },
  { name: "anodal.png", url: "https://anodal.pl/" },
  { name: "astar.png", url: "https://astar.pl/" },
  { name: "bosch.png", url: "https://www.bosch.pl/" },
  {
    name: "ctc-logo-mit-airbus-line.png",
    url: "https://www.ctc-backend.com/en/",
  },
  {
    name: "computer controls.jpg",
    url: "https://www.ccontrols.pl/pl_pl/?utm_term=computer%20controls&utm_campaign=4P+-+Wyszukiwarka+-+Brand+-+PL&utm_source=adwords&utm_medium=ppc&hsa_acc=5776325502&hsa_cam=1748560941&hsa_grp=75287601584&hsa_ad=539317009618&hsa_src=g&hsa_tgt=kwd-311144365331&hsa_kw=computer%20controls&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQjwj9-zBhDyARIsAERjds0xUeQm0g1a8hBpirS6YIs2AOKA3sZHQDU7LeztdhwZMP-YO0y7vI8aAkPSEALw_wcB",
  },
  { name: "altium.png", url: "https://www.altium.com/" },
  { name: "czekała.png", url: "https://wagi-czekala.pl/" },
  { name: "eurocircuits.jpg", url: "https://www.eurocircuits.com/" },
  { name: "ELMAR_logo_www_duze_red.png", url: "https://www.elmar-bhp.pl/" },
  { name: "indasa.jpg", url: "https://indasa.sklep.pl/" },
  { name: "inkarbo.jpg", url: "https://www.inkarbo.com/" },
  { name: "inter-metal.png", url: "https://www.inter-metal.com.pl/" },
  { name: "kaufland.png", url: "https://www.kaufland.pl/" },
  { name: "lange .png", url: "https://langelukaszuk.pl/" },
  { name: "quay.png", url: "https://www.quay.pl/" },
  { name: "mitutoyo.png", url: "https://mitutoyo.pl/pl_pl" },
  { name: "ntn-snr.png", url: "https://www.ntn-snr.com/pl" },
  { name: "polak modele i prototypy.png", url: "https://modeleiprototypy.pl/" },
  { name: "protoplastic.png", url: "https://protoplastic.pl/" },
  { name: "rs.png", url: "https://pl.rs-online.com/web/" },
  { name: "schaeffler.png", url: "https://www.schaeffler.pl/pl/" },
  { name: "tenneco logo finalrgb.png", url: "https://www.tenneco.com/" },
  { name: "vector.png", url: "https://www.vector.com/int/en/" },
  { name: "Wolfratech_Logo.png", url: "http://www.wolfratech.pl/" },
  { name: "WAMTECHNIK_Logo_NeutralBlack-1.png", url: "https://wamtechnik.pl/" },
];

const silverSponsors = [
  { name: "logo-AMA-PROFIL-COREL-_2_.png", url: "https://www.amaprofil.pl/" },
  { name: "auto zatoka.jpg", url: "https://www.auto-zatoka.pl/" },
  { name: "boellhoff-logo.svg", url: "https://www.boellhoff.com/pl-pl/" },
  { name: "chem trend.png", url: "https://pl.chemtrend.com/" },
  { name: "czupryna car.png", url: "http://czupryna.eu/" },
  { name: "cnc jurczak.png", url: "https://cncjurczak.pl/" },
  { name: "LOGO-nowe 2019.png", url: "https://www.perrot.de/pl/" },
  {
    name: "dewrap.png",
    url: "https://www.facebook.com/p/DeWrap-100063967515424/",
  },
  { name: "hellermanntyton.jpg", url: "https://www.hellermanntyton.pl/" },
  { name: "jusky.png", url: "https://jusky.pl/" },
  {
    name: "logo_branson.png",
    url: "https://www.emerson.com/pl-pl/automation/branson",
  },
  { name: "logo_wichuworkshop.jpg", url: "https://www.wichuworkshop.pl/" },
  { name: "Logo_NewTechnology (1).png", url: "https://www.newtec.pl/pl/" },
  { name: "IEWC-Logo.png", url: "https://www.iewc.com/" },
  { name: "smart one.png", url: "https://smart-one.com.pl/" },
  {
    name: "sonel.png",
    url: "https://www.sonel.pl/pl/",
  },
  { name: "stelweld.png", url: "https://www.stelweld.com.pl/" },
  { name: "tadex_logo_black.svg", url: "https://tadex.com.pl/" },
  { name: "wo bit.png", url: "https://wobit.com.pl/" },
  { name: "wimarol.jpg", url: "https://waterjet.pl/" },
];



interface SponsorGridProps {
  sponsorRank: string;
  gridCols: string;
  height: string;
  gap?: string;
  sponsors: Array<{ name: string; url: string }>;
}

const SponsorList: React.FC<SponsorGridProps> = ({
  sponsorRank,
  gridCols,
  height,
  sponsors,
}) => (
  <div className={`grid ${gridCols} gap-2 h-min md:w-1/2`}>
    {sponsors.map((sponsor) => (
      <a
        key={sponsor.name}
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${height} relative mx-6 rounded-md overflow-hidden duration-300 ease-in-out hover:scale-110`}
      >
        <Image
          src={`/images/sponsors/${sponsor.name}`}
          alt={sponsor.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-scale-down"
        />
      </a>
    ))}
  </div>
);

const SponsorGrid: React.FC<SponsorGridProps> = ({
  sponsorRank,
  gridCols,
  height,
  gap,
  sponsors,
}) => {
  // 动态将赞助商数组分成两半
  const halfIndex = Math.ceil(sponsors.length / 2);
  const firstHalfSponsors = sponsors.slice(0, halfIndex);
  const secondHalfSponsors = sponsors.slice(halfIndex);

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="py-4 my-4 md:my-12 md:mt-14 border-y-2 md:w-fit px-8 border-customRed uppercase">
        <Title color="black">{sponsorRank}</Title>
      </div>
      <div className={`flex ${gap} flex-col md:flex-row w-full`}>
        <SponsorList
          sponsors={firstHalfSponsors}
          height={height}
          sponsorRank={sponsorRank}
          gridCols={gridCols}
        />
        <SponsorList
          sponsors={secondHalfSponsors}
          height={height}
          sponsorRank={sponsorRank}
          gridCols={gridCols}
        />
      </div>
    </div>
  );
};

const Partners = () => {
  const router = useRouter();
  return (
    <div className=" pt-[100px] md:pt-[120px] mb-6 md:mb-12">
      <div className="absolute opacity-5 right-0">
        <h1 className="text-[15rem] font-extrabold text-black uppercase leading-none">
          校企伙伴
        </h1>
      </div>
      <Container>
        <div className="flex flex-col items-center text-center w-full">
          <div className="py-4 my-4 border-b-2 md:w-3/5 border-black">
            <Title color="black">校企伙伴</Title>
          </div>
          <div className="my-8 flex gap-4 md:w-1/3">
            <Button
              label="成为合作伙伴"
              onClick={() => router.push(`/partners/joinus`)}
            />
            <Button
              outline
              label="联系我们"
              onClick={() => router.push(`/contact`)}
            />
          </div>

          <SponsorGrid
            sponsorRank="同行起点"
            sponsors={strategicSponsors}
            height="h-20 md:h-40"
            gap="gap-0"
            gridCols="grid-cols-2"
          />

          <SponsorGrid
            sponsorRank="梦想落地"
            sponsors={platinumSponsors}
            height="h-20 md:h-40"
            gap="md:gap-20"
            gridCols="grid-cols-2"
          />

          <SponsorGrid
            sponsorRank="黄金合作伙伴"
            sponsors={goldSponsors}
            height="h-16 md:h-36"
            gap="md:gap-20"
            gridCols="grid-cols-3"
          />

          <SponsorGrid
            sponsorRank="白银合作伙伴"
            sponsors={silverSponsors}
            height="h-16 md:h-32"
            gap="md:gap-16"
            gridCols="grid-cols-3 md:grid-cols-4"
          />
        </div>
      </Container>
    </div>
  );
};

export default Partners;
