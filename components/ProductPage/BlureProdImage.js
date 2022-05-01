import { buildUrl } from 'cloudinary-build-url';
import { useEffect, useState} from 'react';

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

export default function BlureProdImage(baseLink){

    const[imagePath, setImPath] = useState("ProductsImages/" + parse_url(baseLink).script);
    const[clUser, setUser] = useState(parse_url(baseLink).user);
    const[outUrl, setUrl] = useState("");


    useEffect(()=>{
        setUser(parse_url(baseLink).user);
        if(baseLink !== undefined){
         
        

        const src = buildUrl(imagePath, {
            cloud: {
              cloudName: clUser,
            },
            transformations: {
              effect: {
                  name: 'blur',
                  value: 1000
                }
            }
          })
          
          setUrl(src);
        }
    }, [])

    // https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png
    return outUrl;


} 