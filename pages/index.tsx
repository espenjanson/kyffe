import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"

function getTrailingZero(num: number) {
  const numString = num.toString()

  let str = "00"

  return str.substring(numString.length) + numString
}

const Home: NextPage = () => {
  const [timeLeft, setTimeLeft] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      const theDate = new Date()
      theDate.setMonth(9)
      theDate.setDate(1)
      theDate.setHours(9)
      theDate.setMinutes(0)
      theDate.setSeconds(0)
      theDate.setMilliseconds(0)

      const now = new Date()

      now.setMilliseconds(0)

      const diff = theDate.getTime() - now.getTime()

      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff - days * 86400000) / 3600000)
      const minutes = Math.floor(
        (diff - days * 86400000 - hours * 3600000) / 60000
      )
      const seconds = Math.floor(
        (diff - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000
      )

      const timeLeft = [
        { name: "days", value: days },
        { name: "hours", value: hours },
        { name: "minutes", value: minutes },
        { name: "seconds", value: seconds },
      ].reduce((acc, curr, currIndex) => {
        return (
          acc +
          getTrailingZero(curr.value) +
          " " +
          curr.name +
          (currIndex !== 3 ? " " : "")
        )
      }, "")

      setTimeLeft(timeLeft)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <Head>
        <title>Kyffe Inc.</title>
        <meta name="description" content="It's kyffe time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home">
        <h1>Time left to KYFFE:</h1>
        <h2>{timeLeft}</h2>
      </div>
    </div>
  )
}

export default Home
