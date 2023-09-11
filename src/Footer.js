import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="Footer">
      <p>Copyright &copy; {currentYear}</p>
    </div>
  )
}
