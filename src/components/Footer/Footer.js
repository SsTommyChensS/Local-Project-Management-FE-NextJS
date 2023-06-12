import Image from "next/image"

import style from "./footer.module.css"

const Footer = () => {
    return (
        <div className={style.footer}>
            <div className="footer__author">
                <h3 className="footer__author__name">
                   @ Tran Quoc Tung - Tommy 
                </h3>
            </div>
            <div className="footer__information">
                <ul className={style.footer__information__details}>
                    <li className={style.information__details__item}>Facebook <Image src="/facebook.svg" width={20} height={20} alt="Facebook icon"/></li>
                    <li className={style.information__details__item}>LinkedIn <Image src="/linkedin.svg" width={20} height={20} alt="Linkedin icon"/></li>
                    <li className={style.information__details__item}>Github <Image src="/github.svg" width={20} height={20} alt="Github icon"/></li>
                    <li className={style.information__details__item}>Gmail <Image src="/gmail.svg" width={20} height={20} alt="Gmail icon"/></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer