from vector import Vector

class Pendulum(Vector):#representation of pendulum in memory
    def __init__(self, x=500, y=500, gravity=0.1):
        super().__init__(0, y)
        self.starting_point_x = x
        self.starting_point_y = 0
        self.gravity = Vector(0, gravity, self)
        self.tension = Tension(0, -gravity, self)
        self.speed = Vector(3, 0, self)
        self.speed.mark_forces(self.gravity)
        self.speed.mark_forces(self.tension)
        self.mark_forces(self.speed)
        self.full_energy = self.get_kinetic_energy() + self.get_potential_energy()

    def draw(self, animator):
        #print(self.x + self.starting_point_x, self.y + self.starting_point_y)
        #animator.goto(self.x + self.starting_point_x, self.y + self.starting_point_y)
        draw_string = ""
        draw_string += animator.circle(self.starting_point_x + self.x, self.starting_point_y + self.y, 25, "3", "black")
        draw_string += animator.line(self.starting_point_x, self.starting_point_y, self.starting_point_x + self.x, self.starting_point_y + self.y, "3", "black")
        return draw_string

    def get_kinetic_energy(self):
        return self.speed.length() ** 2 / 2

    def set_kinetic_energy(self, num):
        self.speed.set_length(abs(num * 2) ** 0.5)

    def get_potential_energy(self):
        return self.gravity.length() * (self.x - self.starting_point_y)

    def tick2(self):
        self.model_implications()

    def model_implications(self):
        if self.y < self.starting_point_y:
            self.speed.zero_out()
        self.set_length(500)
        print(self.full_energy)
        print(self.get_kinetic_energy() + self.get_potential_energy())
        print(self.get_potential_energy())
        self.set_kinetic_energy(self.full_energy - self.get_potential_energy())


    def get_working_vectors(self):
        return [self, self.gravity, self.tension, self.speed]


class Tension(Vector):
    def __init__(self, x, y, aux):
        super().__init__(x, y, aux)

    def tick2(self):
        self.turn_to_coordinate(
            self.backlink.starting_point_x,
            self.backlink.starting_point_y,
            self.backlink.x + self.backlink.starting_point_x,
            self.backlink.y + self.backlink.starting_point_y
        )


if __name__ == "__main__":
    PENDULUM = Pendulum()
