import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3 } from 'lucide-react'

export default function PortfolioPage() {
  const holdings = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      avgPrice: 165.20,
      currentPrice: 175.43,
      value: 8771.50,
      gainLoss: 511.50,
      gainLossPercent: 6.18,
      positive: true,
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      shares: 25,
      avgPrice: 420.50,
      currentPrice: 432.12,
      value: 10803.00,
      gainLoss: 290.50,
      gainLossPercent: 2.76,
      positive: true,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 30,
      avgPrice: 398.75,
      currentPrice: 412.78,
      value: 12383.40,
      gainLoss: 420.90,
      gainLossPercent: 3.52,
      positive: true,
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 40,
      avgPrice: 255.30,
      currentPrice: 248.67,
      value: 9946.80,
      gainLoss: -265.20,
      gainLossPercent: -2.60,
      positive: false,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 35,
      avgPrice: 145.80,
      currentPrice: 142.56,
      value: 4989.60,
      gainLoss: -113.40,
      gainLossPercent: -2.22,
      positive: false,
    },
  ]

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0)
  const totalGainLoss = holdings.reduce((sum, holding) => sum + holding.gainLoss, 0)
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100

  const portfolioStats = [
    {
      title: 'Total Portfolio Value',
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      description: 'Current market value',
    },
    {
      title: 'Total Gain/Loss',
      value: `$${totalGainLoss.toLocaleString()}`,
      icon: totalGainLoss >= 0 ? TrendingUp : TrendingDown,
      description: `${totalGainLossPercent.toFixed(2)}% overall`,
      positive: totalGainLoss >= 0,
    },
    {
      title: 'Number of Holdings',
      value: holdings.length.toString(),
      icon: PieChart,
      description: 'Active positions',
    },
    {
      title: 'Diversification Score',
      value: '8.2/10',
      icon: BarChart3,
      description: 'Well diversified',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Portfolio Management
          </h1>
          <p className="text-gray-300 text-lg">
            Track and manage your AI-optimized investment portfolio
          </p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.positive === false ? 'text-red-400' : 'text-blue-400'}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold mb-1 ${stat.positive === false ? 'text-red-400' : 'text-white'}`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-400">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Holdings Table */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Current Holdings</CardTitle>
            <CardDescription className="text-gray-300">
              Your current stock positions and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-2 text-gray-300 font-medium">Symbol</th>
                    <th className="text-left py-3 px-2 text-gray-300 font-medium">Company</th>
                    <th className="text-right py-3 px-2 text-gray-300 font-medium">Shares</th>
                    <th className="text-right py-3 px-2 text-gray-300 font-medium">Avg Price</th>
                    <th className="text-right py-3 px-2 text-gray-300 font-medium">Current Price</th>
                    <th className="text-right py-3 px-2 text-gray-300 font-medium">Market Value</th>
                    <th className="text-right py-3 px-2 text-gray-300 font-medium">Gain/Loss</th>
                    <th className="text-center py-3 px-2 text-gray-300 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding, index) => (
                    <tr key={index} className="border-b border-gray-700/50">
                      <td className="py-4 px-2">
                        <div className="text-white font-bold">{holding.symbol}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-gray-300">{holding.name}</div>
                      </td>
                      <td className="py-4 px-2 text-right text-white">
                        {holding.shares}
                      </td>
                      <td className="py-4 px-2 text-right text-gray-300">
                        ${holding.avgPrice.toFixed(2)}
                      </td>
                      <td className="py-4 px-2 text-right text-white font-medium">
                        ${holding.currentPrice.toFixed(2)}
                      </td>
                      <td className="py-4 px-2 text-right text-white font-medium">
                        ${holding.value.toLocaleString()}
                      </td>
                      <td className="py-4 px-2 text-right">
                        <div className={`font-medium ${holding.positive ? 'text-green-400' : 'text-red-400'}`}>
                          ${holding.gainLoss.toFixed(2)}
                        </div>
                        <div className={`text-sm ${holding.positive ? 'text-green-400' : 'text-red-400'}`}>
                          {holding.gainLossPercent.toFixed(2)}%
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button size="sm" variant="outline" className="text-xs">
                            Buy
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs text-red-400 border-red-400">
                            Sell
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Allocation */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Allocation</CardTitle>
              <CardDescription className="text-gray-300">
                Distribution of your investments by value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.map((holding, index) => {
                  const percentage = (holding.value / totalValue) * 100
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-white font-medium">{holding.symbol}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">{percentage.toFixed(1)}%</span>
                        <span className="text-white font-medium">${holding.value.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-300">
                Manage your portfolio with AI recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Rebalance Portfolio
                </Button>
                <Button variant="outline" className="w-full">
                  Get AI Recommendations
                </Button>
                <Button variant="outline" className="w-full">
                  Add New Position
                </Button>
                <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
                  Close All Positions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
