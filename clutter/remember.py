
""" terminal_animation (v1.0)

A text-based animation which runs on the command line.
The frames of the animation are loaded from the 'anim_frames' module.
A frame is simply a string of characters and the animation consists of a list of frames.

Author: mdq3
2012/05/16

"""

import time
import os
from numpy.random import *
# import animation

duration = 1    # The duration of time in seconds between each frame.
cycles = 20       # The number of cycles the animation plays through.

remembers = 5
def animate():
    """Iterate through the frames, printing then clearing each one to create an animation."""
    count = 0
    while count < cycles:
        for num in range(remembers):
            print('\033[1;34m' + str(randint(10000000,99999999)) + '\033[1;m')  # Print the frame in color blue.
            time.sleep(duration)
            print(os.system('clear'))
        count = count + 1

animate()
