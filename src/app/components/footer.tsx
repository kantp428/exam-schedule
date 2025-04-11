import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal text-neutral-600 items-center p-4 border-t-1 border-neutral-400">
         <aside className="grid-flow-col items-center">
            <p>{new Date().getFullYear()} © This site is made by <a href={'https://github.com/kantp428'} target='_blank'>mrktp</a></p>
         </aside>
      </footer>
    </div>
  )
}

export default Footer