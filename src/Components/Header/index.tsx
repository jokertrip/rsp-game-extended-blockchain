import React from 'react';
import './index.css'

const Header: React.FC = () => {
    return(
        <div className="header">
            <p className='logoWord'><span style={{color: '#FF8080'}}>Rock</span></p>
            <p className='logoWord'><span style={{color: '#FEDD55'}}>Paper</span></p>
            <p className='logoWord'><span style={{color: '#E580FF'}}>Scissors</span></p>
            <p className='logoWord'><span style={{color: '#86DE87'}}>Lizard</span></p>
            <p className='logoWord'><span style={{color: '#80B3FF'}}>Spock</span></p>
        </div>
    )
}

export default Header
