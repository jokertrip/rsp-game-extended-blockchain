import React from 'react';
import './index.css'
// @ts-ignore
import Rock from '../../images/rock.png'
// @ts-ignore
import Paper from '../../images/paper.png'
// @ts-ignore
import Lizard from '../../images/Lizard.png'
// @ts-ignore
import Scissors from '../../images/scissors.png'
// @ts-ignore
import Spock from '../../images/spock.png'
import {Moves} from "../../types";

type Props = {
    onImageChange:(arg0: Moves) => void
}

const MoveChoosing: React.FC<Props> = ({onImageChange}) => {
    const [selectedImage, setSelectedImage] = React.useState<string>('')

    return(
        <div className='gameMove'>
            <p className='text'>Choose your move:</p>
            <div className='imagesNewScreen'>
                <img className={selectedImage === 'rock'? 'selectedImage' : 'imageMove'} src={Rock} alt='rock'
                     onClick={(e)=> {
                         setSelectedImage('rock')
                         onImageChange(Moves.Rock)
                     }}/>
                <img className={selectedImage === 'paper'? 'selectedImage' : 'imageMove'} src={Paper} alt='paper'
                     onClick={(e)=> {
                         setSelectedImage('paper')
                         onImageChange(Moves.Paper)
                     }}/>
                <img className={selectedImage === 'scissors'? 'selectedImage' : 'imageMove'} src={Scissors} alt='scissors'
                     onClick={(e)=> {
                         setSelectedImage('scissors')
                         onImageChange(Moves.Scissors)
                     }}/>
                <img className={selectedImage === 'lizard'? 'selectedImage' : 'imageMove'} src={Lizard} alt='lizard'
                     onClick={(e)=> {
                         setSelectedImage('lizard')
                         onImageChange(Moves.Lizard)
                     }}/>
                <img className={selectedImage === 'spock'? 'selectedImage' : 'imageMove'} src={Spock} alt='spock'
                     onClick={(e)=> {
                         setSelectedImage('spock')
                         onImageChange(Moves.Spock)
                     }}/>
            </div>
        </div>
    )
}

export default MoveChoosing
