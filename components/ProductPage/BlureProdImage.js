import { buildUrl } from 'cloudinary-build-url';
import { useEffect, useState} from 'react';
const cloudinary_acc  = process.env.CLOUDINARY_ACC;

function parse_url(url) {

    var parts = url.split( "#" ),
        out = {};

    out.url = url;
    out.hash = ( parts.length > 1 ? ( ( url = parts.shift() ) || 1 ) && parts.join( "#" ) : "" );
    url = ( parts = url.split( "?" ) ).shift();
    out.search = parts.join( "?" );
    out.scheme = ( parts = url.split( "://" ) ) && parts.length > 1 ? parts.shift() : "";
    out.host = ( ( parts = parts.join( "://" ).split( "/" ) ) && parts.length > 1 &&
                    parts[0].indexOf(".") > 0 || out.scheme ) && parts.shift() || "";
    out.script = parts.pop();
    out.path = ( parts.length > 0 ? "/" : "" ) + parts.join( "/" );
    out.user = out.path.split('/')[1];
    out.folder = out.path.split('/')[out.path.split('/').length - 1];
    return out;
}

export default function BlureProdImage(baseLink, blurValue = 1000){

    const[imagePath, setImPath] = useState();
    const[clUser, setUser] = useState();
    const[outUrl, setUrl] = useState();



    useEffect(()=>{
      if(baseLink){
        setImPath("ProductsImages/" + parse_url(baseLink).script);
        setUser(parse_url(baseLink).user);

        // console.log(parse_url(baseLink).user)
      }
    })

    // useEffect(()=>{
    //     console.log(clUser);
    // },[clUser])

    useEffect(()=>{
      if(clUser && imagePath && baseLink){
        // console.log(
        //     'clUser', clUser, '/n',
        //     'imagePath', imagePath, '/n',
        //     'baseLink', baseLink, '/n'
        // )
        setUser(parse_url(baseLink).user);
        const src = buildUrl(imagePath, {
            cloud: {
              cloudName: clUser,
            },
            transformations: {
              effect: {
                  name: 'blur',
                  value: blurValue
                }
            }
          })

          setUrl(src);
      }
    }, [imagePath, clUser, imagePath])

    // https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png
    return outUrl;


} 