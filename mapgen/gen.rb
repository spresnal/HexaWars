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

x = 80
y = 20

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

print_grid final
