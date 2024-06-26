
const Loader = () => {
  return (
    <div>
      loading
    </div>
  )
}
export default Loader;

interface SkeletonProps {
  width?:string;
  length?:number;
}

export const Skeleton=({width="unset" , length=20}:SkeletonProps)=>{

  const skeletions = Array.from({length},(_,idx)=><div key={idx} className="skeleton-shape"></div>)
  return (
    <div className="skeleton-loader" style={{width}}>
      {skeletions}
    </div>
  )
}