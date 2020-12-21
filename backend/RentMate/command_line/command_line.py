import sys
import argparse





def parse_args(argv):
    parser = argparse.ArgumentParser(description='')
    options = parser.parse_args(argv)
    return options


def main(args):
    print('Running....')

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))