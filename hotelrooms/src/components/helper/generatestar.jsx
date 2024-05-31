
const GenerateStar = ({score}) => {
    if(score==1) {
        return (<span className="text-yellow-500">★☆☆☆☆</span>)
    } else if (score==2) {
        return (<span className="text-yellow-500">★★☆☆☆</span>)
    } else if (score==3) {
        return (<span className="text-yellow-500">★★★☆</span>)
    } else if (score==4) {
        return (<span className="text-yellow-500">★★★★☆</span>)
    } else if(score==5) {
        return (<span className="text-yellow-500">★★★★★</span>)
    }
}

export default GenerateStar;