import React from 'react'
import { Card, Skeleton } from "antd";

const CardLoading = ({count}) => {
    const cards = () => {
        let totalCard = []
        for(let i=0; i<count; i++){
            totalCard.push(<Card className='col-md-4'>
                <Skeleton active></Skeleton>
            </Card>)
        }
        return totalCard
    }
  return (
    <>
        <div className='row pb-5'>
            {cards()}
        </div>
    </>
  )
}

export default CardLoading
