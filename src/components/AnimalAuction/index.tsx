import { useState } from 'react';

import './AnimalAuction.css';

import Axolotl from '../../images/Animals/Axolotl.jpeg';
import Bear from '../../images/Animals/Bear.jpeg';
import Blobfish from '../../images/Animals/Blobfish.jpeg';
import Capybara from '../../images/Animals/Capybara.jpeg';
import Cat from '../../images/Animals/Cat.jpeg';
import Cheetah from '../../images/Animals/Cheetah.jpeg';
import Deer from '../../images/Animals/Deer.jpeg';
import Dugong from '../../images/Animals/Dugong.jpeg';
import Elephant from '../../images/Animals/Elephant.jpeg';
import Fox from '../../images/Animals/Fox.jpeg';
import Gazzelle from '../../images/Animals/Gazzelle.jpeg';
import Giraffe from '../../images/Animals/Giraffe.jpeg';
import Jaguar from '../../images/Animals/Jaguar.jpeg';
import Jellyfish from '../../images/Animals/Jellyfish.jpeg';
import Koala from '../../images/Animals/Koala.jpeg';
import Lion from '../../images/Animals/Lion.jpeg';
import Monkey from '../../images/Animals/Monkey.jpeg';
import Moose from '../../images/Animals/Moose.jpeg';
import Owl from '../../images/Animals/Owl.jpeg';
import Parrot from '../../images/Animals/Parrot.jpeg';
import PolarBear from '../../images/Animals/PolarBear.jpeg';
import ProboscisMonkey from '../../images/Animals/ProboscisMonkey.jpeg';
import Raindeer from '../../images/Animals/Raindeer.jpeg';
import RedHandfish from '../../images/Animals/RedHandfish.jpeg';
import Walrus from '../../images/Animals/Walrus.jpeg';

import Three from '../../images/Levels/Three.svg';

import China from '../../images/Regions/China.svg';
import Japan from '../../images/Regions/Japan.png';
import USA from '../../images/Regions/USA.svg';
import Italy from '../../images/Regions/Italy.svg';
import UK from '../../images/Regions/UK.png';

function AnimalAuction() {
    const animals = [Axolotl, Bear, Blobfish, Capybara, Cat, Cheetah, Deer, Dugong, Elephant, Fox, Gazzelle, Giraffe, Jaguar, Jellyfish, Koala, Lion, Monkey, Moose, Owl, Parrot, PolarBear, ProboscisMonkey, Raindeer, RedHandfish, Walrus];
    const levels = [Three];
    const regions = [China];

    const [ i, setI ] = useState(0);

    function handleClick() {
        setI(prevI => prevI + 1);
    }

    return (
        <div className='animal-container'>
            <img className='animal-image' src={animals[i]} />
            <div className='details'>
                <img className='detail' src={UK} />
                <span className='nome'>
                    Ciao
                </span>
                <img className='detail' src={Three} />
            </div>
            <button onClick={handleClick}> Press </button>
        </div>
    );
}

export default AnimalAuction;
