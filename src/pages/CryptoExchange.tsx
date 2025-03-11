
import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUpDown, 
  Wallet, 
  LineChart, 
  Clock,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function CryptoExchange() {
  useEffect(() => {
    document.title = 'Crypto Exchange | SISO Platform';
  }, []);

  const marketData = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 63482.15, change: 2.4, volume: '24.8B' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3480.92, change: 1.8, volume: '12.4B' },
    { id: 3, name: 'Solana', symbol: 'SOL', price: 149.63, change: 5.2, volume: '3.2B' },
    { id: 4, name: 'Cardano', symbol: 'ADA', price: 0.58, change: -1.3, volume: '1.1B' },
    { id: 5, name: 'Polkadot', symbol: 'DOT', price: 7.23, change: -0.5, volume: '0.8B' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 overflow-auto bg-background">
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Crypto Exchange</h1>
              <p className="text-muted-foreground mt-2">
                Trade cryptocurrencies and manage your digital assets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-muted-foreground">Portfolio Value</h3>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-2xl font-bold">$12,458.32</div>
                  <div className="mt-1 flex items-center text-sm text-green-500">
                    <ChevronUp className="h-4 w-4 mr-1" />
                    <span>+5.2%</span>
                    <span className="text-muted-foreground ml-1">this week</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-muted-foreground">Active Trades</h3>
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-2xl font-bold">3</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span>2 buy orders, 1 sell order</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-muted-foreground">Trading Volume</h3>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-2xl font-bold">$3,251.78</div>
                  <div className="mt-1 flex items-center text-sm text-red-500">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    <span>-2.1%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
              </Card>
            </div>

            <Tabs defaultValue="market">
              <TabsList className="mb-6">
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="trade">Trade</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="market">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Market Overview</h3>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Updated just now</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-12 bg-muted p-4 rounded-t-lg font-medium">
                      <div className="col-span-6">Asset</div>
                      <div className="col-span-2 text-right">Price</div>
                      <div className="col-span-2 text-right">24h Change</div>
                      <div className="col-span-2 text-right">Volume</div>
                    </div>
                    
                    {marketData.map((asset) => (
                      <div key={asset.id} className="grid grid-cols-12 p-4 border-t items-center hover:bg-muted/50 transition-colors">
                        <div className="col-span-6 flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-xs">{asset.symbol.substring(0, 1)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                          </div>
                        </div>
                        <div className="col-span-2 text-right font-medium">
                          ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className={`col-span-2 text-right font-medium ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center justify-end gap-1">
                            {asset.change >= 0 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            <span>{Math.abs(asset.change)}%</span>
                          </div>
                        </div>
                        <div className="col-span-2 text-right text-muted-foreground">
                          {asset.volume}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">View All Markets</Button>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="trade">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Trading Interface</h3>
                  <p className="text-muted-foreground">
                    Trading interface will be available after completing KYC verification.
                  </p>
                </Card>
              </TabsContent>
              
              <TabsContent value="portfolio">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Your Portfolio</h3>
                  <p className="text-muted-foreground">
                    Portfolio view will be available after your first trade.
                  </p>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
                  <p className="text-muted-foreground">
                    No transaction history available yet. Complete your first trade to see it here.
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
