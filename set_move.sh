echo 1; echo $1;
echo 2; echo $2;
echo $1 > /sys/class/gpio/gpio$2/value
