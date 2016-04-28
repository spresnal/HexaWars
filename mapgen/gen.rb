require 'mysql'

def clip(s)
  grid = s.split("\n")[2..-1]
  altgrid = []
  grid.each do |l|
    altgrid << l.split('').map do |n|
      if n == '#'
        1
      else
        0
      end
    end
  end
  altgrid
end

def print_grid(g)
  string = ''
  g.each do |r|
    r.each do |c|
      string << case c
                when 0
                  '.'
                when 1
                  '^'
                when 2
                  '_'
                when 3
                  '#'
                else
                  '#'
                end
    end
    string += "\n"
  end
  puts string
end

x = 102
y = 102

a = clip(`./noise #{x} #{y} 20 5 2 3`)
sleep(1)
b = clip(`./noise #{x} #{y} 20 5 2 3`)
sleep(1)
c = clip(`./noise #{x} #{y} 20 5 2 3`)

final = []

y.times do |xi|
  line = []
  x.times do |yi|
    line << a[xi][yi] + b[xi][yi] + c[xi][yi]
  end
  final << line
end

# clip the edges
final = final[1..-2]
final = final.transpose
final = final[1..-2]

p final.length
p final[1].length
# print_grid final

# --- add to db ---

br = ARGV[0]
bc = ARGV[1]

if (br == nil || bc == nil)
  exit
end

client = Mysql.new(
  "localhost",
  "root",
  "",
  "hexworld"
)

client.query("create table if not exists #{br}_#{bc} (x INT,y INT, type INT, occ INT)")

(0..99).each do |i|
  (0..99).each do |j|
    client.query("insert into #{br}_#{bc} values (\"#{i}\", \"#{j}\", \"#{final[i][j]}\", \"0\")")
  end
end
