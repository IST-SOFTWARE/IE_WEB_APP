import styles from "./geometryValue.module.scss";
import NextImageRatioSaver from "../NextImageRatioSaver";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GeometryViewer({ imagePath, geoSizes }) {
  const [gImage, setGeoImage] = useState();
  const [gSizes, setSizes] = useState();
  const [isLoaded, setLoad] = useState(false);

  useEffect(() => {
    if (imagePath && geoSizes) {
      setGeoImage(imagePath);
      setSizes(geoSizes);
      setLoad(true);
    }
  }, [geoSizes, imagePath]);

  return isLoaded ? (
    <>
      <div className={styles.GeometryWrapper}>
        <div className={styles.GeometryImgWrapper}>
          <div className={styles.GeometryImg}>
            <Image
              src={gImage ? gImage : ""}
              fill={true}
              alt={"GeometryImg"}
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
        <div className={styles.GeometryProps}>
          <ul>
            <li>
              <a>{geoSizes}</a>
            </li>

            {/*{Object.keys(gSizes).map(((k, i) =>*/}
            {/*    gSizes[k] !== null ? */}
            {/*        <li key={i}><a>{k} = {gSizes[k]} мм</a></li> : */}
            {/*    ""*/}
            {/*))}                */}
          </ul>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
